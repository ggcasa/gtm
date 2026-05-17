package server

import (
	"log"
	"net/http"
)

// Server administrează configurarea serverului nostru web
type Server struct {
	listenAddr string
}

// NewServer este un constructor pentru serverul nostru
func NewServer(addr string) *Server {
	return &Server{
		listenAddr: addr,
	}
}

// Start pornește serverul și înregistrează toate rutele în multiplexorul izolat
func (s *Server) Start() error {
	mux := http.NewServeMux()

	// 1. Rutele pentru fișiere statice (CSS, JS, Imagini)
	fs := http.FileServer(http.Dir("./web/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// 2. Rutele speciale pentru PWA și funcționare Offline
	mux.HandleFunc("/sw.js", s.handleServiceWorker)
	mux.HandleFunc("/manifest.json", s.handleManifest)

	// 3. Rutele pentru API (Logica de business)
	mux.HandleFunc("/api/login", s.handleAPILogin)
	mux.HandleFunc("/api/stats", s.handleAPIStats)
	mux.HandleFunc("/api/complete", s.handleAPIComplete)

	// Rutele adăugate corect pe multiplexorul local al serverului
	mux.HandleFunc("/api/manager/dashboard", s.handleManagerDashboard)
	mux.HandleFunc("/api/manager/assign-task", s.handleAssignTask)

	// 4. Ruta principală pentru interfața Frontend
	mux.HandleFunc("/", s.handleIndex)

	log.Printf("Serverul gtm a pornit pe http://localhost%s\n", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, mux)
}
