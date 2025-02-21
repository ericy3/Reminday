package routes

import (
	"github.com/go-chi/chi/v5"
	"reminday-backend/internal/handlers"
)

func RegisterRoutes(r chi.Router) {
	r.Get("/", handlers.HomeHandler)
}
