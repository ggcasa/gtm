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
    ├── sw.js               # [RO] Service Worker pentru funcționare offline (include noile scripturi)
    │                       # [EN] Service Worker handling offline lifecycle (caches new scripts)
    ├── static
    │   ├── css
    │   │   └── style.css   # [RO] Stiluri fluide, teme vizuale și Mobile Query
    │   │                   # [EN] Fluid styling, UI themes, and Mobile Query
    │   └── js
    │       ├── a11y.js     # [RO] Managementul accesibilității și traduceri limbi
    │       │               # [EN] Accessibility management and multi-language logic
    │       ├── api.js      # [RO] Stratul de Rețea / Cereri API izolate către backend-ul Go
    │       │               # [EN] Network Layer / Isolated API requests to the Go backend
    │       ├── app.js      # [RO] Orchestratorul principal / Inițializarea și dirijarea fluxului
    │       │               # [EN] Main Orchestrator / Initialization and top-level flow control
    │       ├── auth.js     # [RO] Sesiuni persistente și gestionarea ecranelor de login/logout
    │       │               # [EN] Persistent session management and login/logout screen routing
    │       ├── operator-tools.js # [RO] Uneltele Operatorului / Dublă confirmare securizată și timere
    │       │               # [EN] Operator Tools / Secure double-confirmation and field timers
    │       └── renderers.js # [RO] Stratul de Interfață / Șabloane și generare HTML pur dinamic
    │                       # [EN] UI Renderer Layer / Templates and dynamic pure-HTML rendering
    └── templates
        └── index.html      # [RO] Structura HTML unificată a aplicației (include scripturile ordonate)
                            # [EN] Unified single-page HTML layout (includes scripts ordered)