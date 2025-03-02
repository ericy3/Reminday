package routes

import (
	"reminday-backend/internal/handlers"
	"reminday-backend/internal/middleware"

	"github.com/go-chi/chi/v5"
)

func RegisterRoutes(r chi.Router, apiHandler handlers.ApiHandler) {
	r.Get("/", handlers.HomeHandler)

	r.Group(func(r chi.Router) {
		r.Post("/login", apiHandler.LoginUser)
		r.Post("/register", apiHandler.RegisterUser)
	})

	// Protected Routes (require valid token)
	r.Group(func(r chi.Router) {
		r.Use(middleware.ValidJWTMiddleware)

	})
}
