package server

import "sync"

// User definește identitatea și rolul în sistem
type User struct {
	Username string `json:"username"`
	Role     string `json:"role"` // "operator" sau "manager"
}

type Task struct {
	ID       string `json:"id"`
	Operator string `json:"operator"`
	Location string `json:"location"`
	Action   string `json:"action"`
	Status   string `json:"status"`
}

type TaskStore struct {
	sync.RWMutex
	users map[string]User
	tasks map[string][]Task
}

// Inițializăm baza de date din RAM cu roluri clare
var db = &TaskStore{
	users: map[string]User{
		"operator_gg":    {Username: "operator_gg", Role: "operator"},
		"operator_ziggy": {Username: "operator_ziggy", Role: "operator"},
		"manager_1":      {Username: "manager_1", Role: "manager"},
	},
	tasks: map[string][]Task{
		"operator_gg": {
			{ID: "1", Operator: "operator_gg", Location: "Zona C - Raft 14", Action: "Pregătire palet descărcare #4402", Status: "În lucru"},
		},
		"operator_ziggy": {},
	},
}

// GetUser verifică dacă utilizatorul există și îi întoarce profilul (inclusiv rolul)
func (store *TaskStore) GetUser(username string) (User, bool) {
	store.RLock()
	defer store.RUnlock()
	user, exista := store.users[username]
	return user, exista
}

func (store *TaskStore) GetTasksForOperator(operator string) []Task {
	store.RLock()
	defer store.RUnlock()
	operatorTasks, exista := store.tasks[operator]
	if !exista {
		return []Task{}
	}
	return operatorTasks
}

func (store *TaskStore) CompleteTask(operator string, taskID string) bool {
	store.Lock()
	defer store.Unlock()
	tasks, exista := store.tasks[operator]
	if !exista {
		return false
	}
	for i, t := range tasks {
		if t.ID == taskID {
			store.tasks[operator][i].Status = "Finalizat"
			return true
		}
	}
	return false
}
