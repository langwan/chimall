package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type LogoutRequest struct {
}

type LogoutResponse struct {
}

func Logout(c *gin.Context) {
	c.String(http.StatusOK, "hello login")
}
