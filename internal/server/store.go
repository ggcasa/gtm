package server

import (
	"fmt"
	"sync"
)

// User definește identitatea și rolul în sistem
type User struct {
	Username string `json:"username"`
	Role     string `json:"role"` // "operator" sau "manager"
}

// Task reprezintă un ordin de lucru alocat unui operator
type Task struct {
	ID       string `json:"id"`
	Operator string `json:"operator"`
	Location string `json:"location"`
	Action   string `json:"action"`
	Status   string `json:"status"`
}

// Rampa reprezintă starea unei rampe logistice din flotă
type Rampa struct {
	ID     int    `json:"id"`
	Zona   string `json:"zona"`
	Status string `json:"status"` // "Liberă", "Descărcare", "În așteptare"
	Camion string `json:"camion"` // Numărul sau identificatorul camionului
}

// TaskStore unifică întreaga bază de date stabilă din memoria RAM
type TaskStore struct {
	sync.RWMutex
	users map[string]User
	tasks map[string][]Task
	rampe []Rampa
}

// Inițializăm instanța unică globală de bază de date din RAM
var db = &TaskStore{
	users: map[string]User{
		"operator_gg":    {Username: "operator_gg", Role: "operator"},
		"operator_ziggy": {Username: "operator_ziggy", Role: "operator"},
		"manager_1":      {Username: "manager_1", Role: "manager"},
	},
	tasks: map[string][]Task{
		"operator_gg": {
			{ID: "1", Operator: "operator_gg", Location: "Zona C - Raft 14", Action: "Pregătire palet descărcare #4402", Status: "În lucru"},
			{ID: "2", Operator: "operator_gg", Location: "Zona L - Raft 4", Action: "Pregătire palet descărcare #6502", Status: "Expediat"},
		},
		"operator_ziggy": {},
	},
	rampe: []Rampa{
		{ID: 1, Zona: "Sector A", Status: "Liberă", Camion: ""},
		{ID: 2, Zona: "Sector A", Status: "Descărcare", Camion: "B-234-GTM"},
		{ID: 3, Zona: "Sector B", Status: "În așteptare", Camion: "CT-89-LOG"},
		{ID: 4, Zona: "Sector C", Status: "Liberă", Camion: ""},
	},
}

// GetUser verifică existența unui utilizator la login
func (store *TaskStore) GetUser(username string) (User, bool) {
	store.RLock()
	defer store.RUnlock()
	user, exista := store.users[username]
	return user, exista
}

// GetTasks returnează task-urile unui anumit operator
func (store *TaskStore) GetTasks(username string) []Task {
	store.RLock()
	defer store.RUnlock()
	return store.tasks[username]
}

// CompleteTask mută starea unui task în "Finalizat"
func (store *TaskStore) CompleteTask(username string, taskID string) bool {
	store.Lock()
	defer store.Unlock()

	lista, exista := store.tasks[username]
	if !exista {
		return false
	}

	for i, t := range lista {
		if t.ID == taskID {
			store.tasks[username][i].Status = "Finalizat"
			return true
		}
	}
	return false
}

// GetRampe extrage starea curentă a flotei/rampelor
func (store *TaskStore) GetRampe() []Rampa {
	store.RLock()
	defer store.RUnlock()
	return store.rampe
}

// AddTaskFromManager adaugă un task nou generat de manager din consolă
func (store *TaskStore) AddTaskFromManager(operator, location, action string) string {
	store.Lock()
	defer store.Unlock()

	totalTasks := 1
	for _, lista := range store.tasks {
		totalTasks += len(lista)
	}
	noulID := fmt.Sprintf("%d", totalTasks)

	noulTask := Task{
		ID:       noulID,
		Operator: operator,
		Location: location,
		Action:   action,
		Status:   "În lucru",
	}

	store.tasks[operator] = append(store.tasks[operator], noulTask)
	return noulID
}
