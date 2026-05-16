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

// Start pornește serverul și înregistrează toate rutele (API și Frontend)
func (s *Server) Start() error {
	mux := http.NewServeMux()

	// 1. Rutele pentru fișiere statice (CSS, JS, Imagini)
	fs := http.FileServer(http.Dir("./web/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// 2. Rutele speciale pentru PWA și funcționare Offline
	mux.HandleFunc("/sw.js", s.handleServiceWorker)
	mux.HandleFunc("/manifest.json", s.handleManifest)

	// 3. Rutele pentru API (Logica de backend din parcul logistic)
	mux.HandleFunc("/api/stats", s.handleAPIStats)

	// 4. Ruta principală pentru Frontend
	mux.HandleFunc("/", s.handleIndex)

	mux.HandleFunc("/api/complete", s.handleAPIComplete)

	log.Printf("Serverul gtm a pornit pe http://localhost%s\n", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, mux)
}
