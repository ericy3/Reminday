package db

import (
	"database/sql"
	"log"
	"os"

	"fmt"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"reminday-backend/internal/types"
)

type postgreSQLClient struct {
	databaseStore *sql.DB
}

func Connect() (*sql.DB, error) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbURL := os.Getenv("DATABASE_URL")
	return sql.Open("postgres", dbURL)
}

func (c *postgreSQLClient) UserExists(username string) (bool, error) {
	var exists bool
	query := "SELECT EXISTS (SELECT 1 FROM users WHERE username = $1)"
	err := c.databaseStore.QueryRow(query, username).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (c *postgreSQLClient) InsertUser(user types.User) error {
	query := "INSERT INTO users (username, passwordHash, userId) VALUES ($1, $2, $3)"
	// Need a symbolic link for accessing events that is user unique - UUID
	_, err := c.databaseStore.Exec(query, user.Username, user.PasswordHash, uuid.New())
	if err != nil {
		fmt.Errorf("Error inserting user, %w", err)
		return err
	}
	return nil
}

func (c *postgreSQLClient) GetUser(username string) (types.User, error) {
	var user types.User

	query := "SELECT username, passwordHash FROM users WHERE username=$1"
	err := c.databaseStore.QueryRow(query, username).Scan(&user.Username, &user.PasswordHash)

	if err != nil {
		if err == sql.ErrNoRows {
			return user, fmt.Errorf("User not found. %w", err)
		}
		return user, err
	}

	return user, nil
}
