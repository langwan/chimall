package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Register(c *gin.Context) {
	c.String(http.StatusOK, "hello login")
}
