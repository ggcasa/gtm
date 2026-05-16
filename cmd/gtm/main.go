package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./web/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	})
	http.HandleFunc("/sw.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/sw.js")
	})

	http.HandleFunc("/manifest.json", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./web/manifest.json")
	})

	// 3. Ruta principală care servește pagina HTML
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Evităm ca rutele inexistente să servească index.html
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		http.ServeFile(w, r, "./web/templates/index.html")
	})

	// Ruta API care returnează date dinamice în format JSON
	http.HandleFunc("/api/stats", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// Generăm un JSON simplu direct ca text pentru acest prototip
		jsonResponse := `{
        "modul1": "Activ (Utilizare CPU: 12%)",
        "modul2": "Conectat la DB (0.5ms)",
        "modul3": "Toate sistemele sunt online"
    }`

		w.Write([]byte(jsonResponse))
	})

	log.Println("Serverul gtm a pornit pe http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Eroare la pornirea serverului: ", err)
	}
}
