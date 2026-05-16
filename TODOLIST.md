# GTM - Project Refactoring & Modularization To-Do List

[RO] Acest fișier urmărește pașii necesari pentru a transforma prototipul curent într-o aplicație complet modulară, decuplata și pregătită pentru producție, înainte de îmbinarea finală în ramura principală (`master` / `main`).

[EN] This file tracks the necessary steps to transform the current prototype into a fully modular, decoupled, and production-ready application before the final merge into the main branch (`master` / `main`).

---

## 📦 1. Backend (Go) — Modularization

- **[RO] Izolarea pachetului de stocare (`internal/store`)**
  - [ ] Mută codul bazei de date din RAM din `store.go` într-un pachet independent `package store` (localizat în `internal/store/store.go`).
  - [ ] Elimină orice dependență sau referință la protocoale HTTP din noul pachet `store`.
- **[EN] Isolate the Storage Package (`internal/store`)**
  - [ ] Move the RAM database logic from `store.go` into an independent `package store` (located at `internal/store/store.go`).
  - [ ] Remove any HTTP protocol dependencies or references from the new `store` package.

- **[RO] Injectarea dependențelor în handlere (`internal/server`)**
  - [ ] Elimină utilizarea variabilelor globale de memorie din pachetul `server`.
  - [ ] Modifică structura serverului din `server.go` pentru a primi o instanță de `store.New()` la inițializare.
- **[EN] Dependency Injection in Handlers (`internal/server`)**
  - [ ] Remove the use of global memory variables within the `server` package.
  - [ ] Modify the server struct in `server.go` to receive a `store.New()` instance upon initialization.

---

## 🌐 2. Frontend (JavaScript) — State & DOM Decoupling

- **[RO] Curățarea conflictelor și a codului duplicat**
  - [ ] Șterge definitiv funcția duplicat învechită `loadOperatorTasks` din `auth.js` pentru a lăsa `app.js` ca unic orchestrator.
  - [ ] Unifică cheile din `localStorage` (folosește strict `gtm_user` și `gtm_role` în toate scripturile).
- **[EN] Cleanup Conflicts and Duplicate Code**
  - [ ] Permanently delete the obsolete duplicate `loadOperatorTasks` function from `auth.js` to leave `app.js` as the sole orchestrator.
  - [ ] Unify `localStorage` keys (strictly use `gtm_user` and `gtm_role` across all scripts).

- **[RO] Decuplarea componentelor de randare (`renderers.js`)**
  - [ ] Asigură-te că funcțiile din `GTM_Render` returnează exclusiv șabloane de text (string-uri HTML pure).
  - [ ] Parametrizează funcțiile de încărcare (ex: `loadOperatorTasks(username, containerSelector)`) pentru a permite randarea în orice zonă din DOM.
- **[EN] Decouple Rendering Components (`renderers.js`)**
  - [ ] Ensure functions inside `GTM_Render` exclusively return text templates (pure HTML strings).
  - [ ] Parameterize loading functions (e.g., `loadOperatorTasks(username, containerSelector)`) to allow rendering into any DOM area.

---

## 🎨 3. UI/UX & CSS — Responsive Flexibility

- **[RO] Remedierea suprapunerilor pe rezoluții mobile**
  - [ ] Adaugă un `padding-top` adaptiv în clasa `.container` pentru a preveni coliziunea elementelor cu rotița de accesibilitate fixă (`.a11y-dropdown`).
  - [ ] Securizează lățimea clasei `.header-section` și a butonului de logout pentru ecrane tactile înguste (`532px`).
- **[EN] Fix Overlaps on Mobile Layouts**
  - [ ] Add an adaptive `padding-top` to the `.container` class to prevent element collisions with the fixed accessibility wheel (`.a11y-dropdown`).
  - [ ] Secure the width layout of the `.header-section` and logout button for narrow touchscreens (`532px`).

- **[RO] Capsularea stilurilor**
  - [ ] Organizează cele 218 linii din `style.css` folosind o structură clară bazată pe componente (ex: `.auth-screen`, `.operator-screen`).
- **[EN] Style Encapsulation**
  - [ ] Organize the 218 lines inside `style.css` using a clear component-based structure (e.g., `.auth-screen`, `.operator-screen`).

---

## 🚀 4. Git Integration (Master Merge)

- [ ] **[RO] Staging & Commit:** Salvează ultimele modificări pe branch-ul de feature (`git add .` urmat de `git commit`).
- [ ] **[EN] Staging & Commit:** Stage the latest changes on the feature branch (`git add .` followed by `git commit`).
- [ ] **[RO] Aliniere Locală:** Treci pe branch-ul principal și trage ultimele modificări (`git checkout main` -> `git pull origin main`).
- [ ] **[EN] Local Alignment:** Switch to the primary branch and pull the latest changes (`git checkout main` -> `git pull origin main`).
- [ ] **[RO] Fuziune:** Execută `git merge feature/operator-tools` în ramura principală.
- [ ] **[EN] Merge Execution:** Execute `git merge feature/operator-tools` into the main branch.
- [ ] **[RO] Push:** Trimite codul modular verificat pe repository-ul de la distanță (`git push origin main`).
- [ ] **[EN] Push:** Push the verified modular code to the remote repository (`git push origin main`).