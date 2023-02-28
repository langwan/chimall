package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type LoginRequest struct {
}

type LoginResponse struct {
}

func Login(c *gin.Context) {
	c.String(http.StatusOK, "hello login")
}
