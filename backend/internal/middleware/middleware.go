package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const (
	secretKey string = "secret" // Replace with env variable in production
)

func ValidJWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := extractTokenFromHeader(r)
		if tokenString == "" {
			http.Error(w, "Missing Auth Token", http.StatusUnauthorized)
			return
		}
		claims, err := parseToken(tokenString)
		if err != nil {
			http.Error(w, "User unauthorized", http.StatusUnauthorized)
			return
		}
		expires, ok := claims["expires"].(float64)
		if !ok || time.Now().Unix() > int64(expires) {
			http.Error(w, "Token expired", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "jwtClaims", claims)
		next.ServeHTTP(w, r.WithContext(ctx))

	})
}

func extractTokenFromHeader(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return ""
	}

	splitToken := strings.Split(authHeader, "Bearer ")
	if len(splitToken) != 2 {
		return ""
	}

	return splitToken[1]
}

func parseToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("Unauthorized")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("Invalid token claims")
	}
	return claims, nil
}

func GetJWTClaims(r *http.Request) (jwt.MapClaims, bool) {
	claims, ok := r.Context().Value("jwtClaims").(jwt.MapClaims)
	return claims, ok
}
