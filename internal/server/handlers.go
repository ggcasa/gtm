package server

import (
	"encoding/json"
	"net/http"
)

// handleServiceWorker trimite scriptul Service Worker către browser
func (s *Server) handleServiceWorker(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./web/sw.js")
}

// handleManifest trimite manifestul PWA pentru instalare
func (s *Server) handleManifest(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./web/manifest.json")
}

// handleIndex servește interfața grafică principală
func (s *Server) handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, "./web/templates/index.html")
}

// handleAPIStats permite operatorilor sau managerilor să vadă task-urile curente
func (s *Server) handleAPIStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	operator := r.URL.Query().Get("user")
	if operator == "" {
		http.Error(w, `{"error": "Utilizator lipsă"}`, http.StatusBadRequest)
		return
	}

	_, exista := db.GetUser(operator)
	if !exista {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error": "Utilizatorul nu a fost găsit în sistem"}`))
		return
	}

	listaTaskuri := db.GetTasks(operator)
	if listaTaskuri == nil {
		listaTaskuri = []Task{}
	}

	json.NewEncoder(w).Encode(listaTaskuri)
}

// handleAPIComplete validează și marchează un task ca fiind rezolvat de pe teren
func (s *Server) handleAPIComplete(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Metodă nepermisă"}`, http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	operator := r.URL.Query().Get("user")
	taskID := r.URL.Query().Get("id")

	if operator == "" || taskID == "" {
		http.Error(w, `{"error": "Parametri incompleți"}`, http.StatusBadRequest)
		return
	}

	succes := db.CompleteTask(operator, taskID)
	if !succes {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error": "Task-ul sau utilizatorul nu există"}`))
		return
	}

	w.Write([]byte(`{"status":"success"}`))
}

// handleAPILogin verifică utilizatorul la autentificare și returnează rolul lui
func (s *Server) handleAPILogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Metodă nepermisă"}`, http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	usernameInput := r.URL.Query().Get("user")
	if usernameInput == "" {
		http.Error(w, `{"error": "Parametru user lipsă"}`, http.StatusBadRequest)
		return
	}

	user, exista := db.GetUser(usernameInput)
	if !exista {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error": "Utilizator neautorizat"}`))
		return
	}

	json.NewEncoder(w).Encode(user)
}

// handleManagerDashboard întoarce starea centralizată a rampelor și operatorii (GET)
func (s *Server) handleManagerDashboard(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"error": "Metodă nepermisă"}`, http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	db.RLock()
	var operatoriActivi []User
	for _, u := range db.users {
		if u.Role == "operator" {
			operatoriActivi = append(operatoriActivi, u)
		}
	}
	db.RUnlock()

	response := struct {
		Rampe     []Rampa `json:"rampe"`
		Operatori []User  `json:"operatori"`
	}{
		Rampe:     db.GetRampe(),
		Operatori: operatoriActivi,
	}

	json.NewEncoder(w).Encode(response)
}

// handleAssignTask preia datele din formular și generează un task nou (POST)
func (s *Server) handleAssignTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Metodă nepermisă"}`, http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	var payload struct {
		Operator string `json:"operator"`
		Location string `json:"location"`
		Action   string `json:"action"`
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, `{"error": "Payload invalid"}`, http.StatusBadRequest)
		return
	}

	if payload.Operator == "" || payload.Location == "" || payload.Action == "" {
		http.Error(w, `{"error": "Toate câmpurile sunt obligatorii"}`, http.StatusBadRequest)
		return
	}

	db.AddTaskFromManager(payload.Operator, payload.Location, payload.Action)

	w.Write([]byte(`{"status":"success"}`))
}
