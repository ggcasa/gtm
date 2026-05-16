package main

import (
	"gtm/internal/server"
	"log"
)

func main() {
	// Inițializăm serverul pe portul 8080 folosind structura din /internal
	srv := server.NewServer(":8080")

	// Pornim serverul modular
	err := srv.Start()
	if err != nil {
		log.Fatal("Eroare critică la pornirea serverului: ", err)
	}
}
