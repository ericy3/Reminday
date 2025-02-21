package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/lib/pq"
)

func Connect() (*sql.DB, error) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbURL := os.Getenv("DATABASE_URL")
	return sql.Open("postgres", dbURL)
}
