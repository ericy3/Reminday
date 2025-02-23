package types

type RegisterUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Username     string `json:"username"`
	PasswordHash string `json:"password"`
}

type UserStore interface {
	UserExists(username string) (bool, error)
	InsertUser(user User) error
	GetUser(username string) (User, error)
}
