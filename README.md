# GTM - Tasks Management

[RO] Aplicație PWA (Progressive Web App) modulară destinată managementului task-urilor și monitorizării flotei în parcurile logistice. Proiectul folosește un backend robust scris în Go și un frontend responsive cu suport offline și control al accesului bazat pe roluri (RBAC).

[EN] A modular PWA (Progressive Web App) designed for task management and fleet monitoring in logistics parks. The project features a robust Go backend and a responsive frontend with offline support and Role-Based Access Control (RBAC).

---

## 🚀 Tehnologii Utilizate / Technologies Used

- **Backend:** Go (Golang) 1.22+ 
  - [RO] Arhitectură modulară, `sync.RWMutex` pentru concurență în RAM.
  - [EN] Modular architecture, `sync.RWMutex` for safe memory concurrency in RAM.
- **Frontend:** HTML5, CSS3
  - [RO] Layout-uri fluide și Media Queries pentru optimizare mobilă strictă.
  - [EN] Fluid layouts and Media Queries for strict mobile responsiveness.
- **PWA / Service Worker:**
  - [RO] Strategii de cache optimizate care ignoră intenționat cererile de tip POST.
  - [EN] Optimized caching strategies that explicitly bypass POST network requests.

---

## 📂 Structura Proiectului / Project Structure

```text
├── cmd
│   └── gtm
│       └── main.go         # [RO] Punctul de intrare / Pornește serverul
│                           # [EN] Entry point / Starts the web server
├── internal
│   └── server
│       ├── handlers.go     # [RO] Tratarea rutelor HTTP (API, Index, SW, Manifest)
│       │                   # [EN] HTTP Handlers (API, Index, SW, Manifest)
│       ├── server.go       # [RO] Configurarea și maparea rutelor serverului web
│       │                   # [EN] Server configuration and route mapping
│       └── store.go        # [RO] Baza de date din RAM și modelele de date (RBAC)
│                           # [EN] RAM Database and core data models (RBAC)
└── web
    ├── manifest.json       # [RO] Metadata pentru instalarea ca aplicație PWA
    │                       # [EN] Installation metadata for PWA configuration
    ├── sw.js               # [RO] Service Worker pentru funcționare offline
    │                       # [EN] Service Worker handling offline lifecycle
    ├── static
    │   ├── css
    │   │   └── style.css   # [RO] Stiluri fluide, teme vizuale și Mobile Query
    │   │                   # [EN] Fluid styling, UI themes, and Mobile Query
    │   └── js
    │       ├── a11y.js     # [RO] Managementul accesibilității și traduceri limbi
    │       │               # [EN] Accessibility management and multi-language logic
    │       ├── app.js      # [RO] Orchestratorul PWA și inițializarea DOM-ului
    │       │               # [EN] PWA orchestrator and core DOM initialization
    │       └── auth.js     # [RO] Gestionarea sesiunilor persistente și rutarea ecrnelor
    │                       # [EN] Persistent session management and screen routing
    └── templates
        └── index.html      # [RO] Structura HTML unificată a aplicației
                            # [EN] Unified single-page HTML layout
