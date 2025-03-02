package main

import (
	"fmt"
	"net/http"
	"reminday-backend/internal/database"
	"reminday-backend/internal/handlers"
	"reminday-backend/internal/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	db := db.NewPostgreSQLClient()
	apiHandler := handlers.NewApiHandler(db)

	routes.RegisterRoutes(r, apiHandler)

	fmt.Printf("Server running on 3000")
	http.ListenAndServe(":3000", r)
}
