package server

import "net/http"

// handleServiceWorker trimite scriptul Service Worker către browser
func (s *Server) handleServiceWorker(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./web/sw.js")
}

// handleManifest trimite manifestul PWA pentru a permite instalarea aplicației
func (s *Server) handleManifest(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./web/manifest.json")
}

// handleIndex servește pagina principală (interfața utilizatorului)
func (s *Server) handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, "./web/templates/index.html")
}

// handleAPIStats returnează datele de monitorizare logistică în format JSON
func (s *Server) handleAPIStats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	jsonResponse := `{
		"modul1": "Activ (Utilizare CPU: 12%)",
		"modul2": "Conectat la DB (0.5ms)",
		"modul3": "Toate sistemele sunt online"
	}`
	w.Write([]byte(jsonResponse))
}
