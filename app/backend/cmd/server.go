package main

import (
	"fmt"
	"net/http"
	"reminday-backend/internal/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	routes.RegisterRoutes(r)

	fmt.Printf("Server running on 3000")
	http.ListenAndServe(":3000", r)
}
