package main

import (
	"log"
	"net/http"
)

func main() {
	// 1. Servim fișierele statice generale (CSS, JS, Icons) din folderul web/static
	// Ele vor fi accesibile la adresa: /static/js/app.js, etc.
	fs := http.FileServer(http.Dir("./web/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// 2. IMPORTANT PENTRU PWA: Service Worker-ul (sw.js) și Manifestul (manifest.json)
	// Trebuie servite direct de la rădăcină (/) pentru ca PWA-ul să aibă scope complet.
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

	log.Println("Serverul gtm a pornit pe http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Eroare la pornirea serverului: ", err)
	}
}
