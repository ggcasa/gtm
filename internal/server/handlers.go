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

// handleAPIStats citește operatorul din URL și cere datele din RAM-ul stocat în store.go
func (s *Server) handleAPIStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	operator := r.URL.Query().Get("user")
	if operator == "" {
		http.Error(w, `{"error": "Utilizator lipsă"}`, http.StatusBadRequest)
		return
	}

	// Apelăm funcția din depozitul de memorie
	operatorTasks := db.GetTasksForOperator(operator)

	// Trimitem JSON-ul înapoi la browser
	json.NewEncoder(w).Encode(operatorTasks)
}

// handleAPIComplete primește cererea POST de la buton și marchează task-ul ca finalizat
func (s *Server) handleAPIComplete(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(`{"error": "Metodă nepermisă, se așteaptă POST"}`))
		return
	}

	operator := r.URL.Query().Get("user")
	taskID := r.URL.Query().Get("id")

	if operator == "" || taskID == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "Parametri lipsă (user sau id)"}`))
		return
	}

	// Schimbăm statusul în store.go
	succes := db.CompleteTask(operator, taskID)

	w.Header().Set("Content-Type", "application/json")
	if !succes {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error": "Task-ul sau operatorul nu a fost găsit"}`))
		return
	}

	// Trimitem JSON-ul de succes pe care îl așteaptă JavaScript
	w.Write([]byte(`{"status": "success"}`))
}
