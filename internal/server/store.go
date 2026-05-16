package server

import "sync"

// Task definește structura unui ordin logistic în parcul de depozite
type Task struct {
	ID       string `json:"id"`
	Operator string `json:"operator"` // Cărei identități îi aparține (ex: operator_gg)
	Location string `json:"location"` // Locația fizică (ex: Zona C - Raft 14)
	Action   string `json:"action"`   // Ce are de făcut (ex: Pregătire palet #4402)
	Status   string `json:"status"`   // "În lucru" sau "Finalizat"
}

// TaskStore administrează baza noastră de date direct în RAM, protejată la concurență
type TaskStore struct {
	sync.RWMutex
	tasks map[string][]Task // Mapăm colecții de task-uri după numele operatorului
}

// Instanțiem magazia noastră globală cu datele de test native
var db = &TaskStore{
	tasks: map[string][]Task{
		"operator_gg": {
			{ID: "1", Operator: "operator_gg", Location: "Zona C - Raft 14", Action: "Pregătire palet descărcare #4402", Status: "În lucru"},
		},
		"operator_ion": {
			{ID: "2", Operator: "operator_ion", Location: "Zona A - Poarta 2", Action: "Verificare sigiliu camion BT-99-LOG", Status: "În lucru"},
		},
	},
}

// GetTasksForOperator extrage în siguranță task-urile unui operator din RAM (Citire)
func (store *TaskStore) GetTasksForOperator(operator string) []Task {
	store.RLock()
	defer store.RUnlock()

	operatorTasks, exista := store.tasks[operator]
	if !exista {
		return []Task{}
	}
	return operatorTasks
}

// CompleteTask schimbă statusul unui task în "Finalizat" direct în memorie (Scriere)
func (store *TaskStore) CompleteTask(operator string, taskID string) bool {
	store.Lock()
	defer store.Unlock()

	tasks, exista := store.tasks[operator]
	if !exista {
		return false
	}

	// Căutăm task-ul corect după ID și îi schimbăm statusul în listă
	for i, t := range tasks {
		if t.ID == taskID {
			store.tasks[operator][i].Status = "Finalizat"
			return true
		}
	}
	return false
}
