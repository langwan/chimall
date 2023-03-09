package h

import (
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

const logFile = "./logs/server.log"

func Logger() gin.HandlerFunc {
	gin.DisableConsoleColor()
	fd, _ := os.OpenFile(logFile, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	gin.DefaultWriter = io.MultiWriter(fd)
	return gin.LoggerWithConfig(gin.LoggerConfig{})
}
