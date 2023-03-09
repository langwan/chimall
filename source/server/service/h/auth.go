package h

import (
	"fmt"
	"github.com/gin-gonic/gin"
	logicToken "server/logic/token"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenSign, err := c.Cookie("token")
		if err != nil {
			Forbidden(c)
			return
		}
		token, err := logicToken.Parse(tokenSign)
		if err != nil {
			Forbidden(c)
			return
		}
		c.Set("token", token)
		fmt.Println("auth function")
	}
}
