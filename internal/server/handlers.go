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

// handleAPIStats permite doar operatorilor să își vadă task-urile, sau managerilor să verifice
func (s *Server) handleAPIStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	operator := r.URL.Query().Get("user")
	if operator == "" {
		http.Error(w, `{"error": "Utilizator lipsă"}`, http.StatusBadRequest)
		return
	}

	// [SECURITATE] Verificăm dacă utilizatorul chiar există în baza de date din RAM
	user, exista := db.GetUser(operator)
	if !exista {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error": "Acces neautorizat. Utilizator inexistent."}`))
		return
	}

	// Dacă totul e ok, trimitem datele
	json.NewEncoder(w).Encode(db.GetTasksForOperator(user.Username))
}

// handleAPIComplete se asigură că doar un OPERATOR poate închide un task
func (s *Server) handleAPIComplete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(`{"error": "Metodă nepermisă"}`))
		return
	}

	operator := r.URL.Query().Get("user")
	taskID := r.URL.Query().Get("id")

	if operator == "" || taskID == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "Parametri lipsă"}`))
		return
	}

	// [SECURITATE CHIEIE] Verificăm rolul direct la nivel de server Go
	user, exista := db.GetUser(operator)
	if !exista || user.Role != "operator" {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(`{"error": "Interzis. Doar operatorii pot finaliza task-uri."}`))
		return
	}

	if !db.CompleteTask(operator, taskID) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error": "Task-ul nu a fost găsit"}`))
		return
	}

	w.Write([]byte(`{"status": "success"}`))
}

// handleAPILogin verifică utilizatorul în RAM și întoarce rolul lui oficial
func (s *Server) handleAPILogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(`{"error": "Metodă nepermisă"}`))
		return
	}

	username := r.URL.Query().Get("user")
	if username == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "Utilizator lipsă"}`))
		return
	}

	user, exista := db.GetUser(username)
	if !exista {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error": "Utilizator necunoscut"}`))
		return
	}

	// Trimitem profilul complet înapoi (Username și Role)
	json.NewEncoder(w).Encode(user)
}
