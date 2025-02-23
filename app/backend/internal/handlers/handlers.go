package handlers

import (
	"fmt"
	"net/http"
	db "reminday-backend/internal/database"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the API 🚀"))
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	database, err := db.Connect()
	if err != nil {
		fmt.Errorf("Error connecting to database %w", err)
		return
	}

}
