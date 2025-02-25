package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	db "reminday-backend/internal/database"
	"reminday-backend/internal/types"
)

type ApiHandler struct {
	dbUserStore types.UserStore
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the API 🚀"))
}

func NewApiHandler(dbStore types.UserStore) ApiHandler {
	return ApiHandler{
		dbUserStore: dbStore,
	}
}

func (api ApiHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	_, err := db.Connect()
	if err != nil {
		fmt.Errorf("Error connecting to database %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var registerUser types.RegisterUser
	decoder := json.NewDecoder(r.Body)
	err = decoder.Decode(&registerUser)
	if err != nil {
		fmt.Errorf("Error parsing form %w", err)
		return
	}

	// Is username or password empty?
	if registerUser.Username == "" || registerUser.Password == "" {
		fmt.Errorf("Username or password is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	exists, err := api.dbUserStore.UserExists(registerUser.Username)

	// Issue with searching for user?
	if err != nil {
		fmt.Errorf("Error checking if user exists %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// Does user already exist?
	if exists {
		fmt.Errorf("User already exists")
		w.WriteHeader(http.StatusConflict)
		return
	}

	user, err := types.NewUser(registerUser)
	if err != nil {
		fmt.Errorf("Error encrypting password, %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = api.dbUserStore.InsertUser(user)
	if err != nil {
		fmt.Errorf("Error inserting user, %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User successfully registered."))
	// Success response?
}

func (api ApiHandler) LoginUser(w http.ResponseWriter, r *http.Request) {
	type LoginRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	var loginRequest LoginRequest
	// Look into what NewDecoder actually does
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&loginRequest)
	if err != nil {
		fmt.Errorf("Invalid request, %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	user, err := api.dbUserStore.GetUser(loginRequest.Username)
	if err != nil {
		fmt.Errorf("Issue getting User, %w", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	valid := types.ValidateUser(user.PasswordHash, loginRequest.Password)
	if valid != true {
		fmt.Errorf("Invalid user credentials.")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully logged in."))
}
