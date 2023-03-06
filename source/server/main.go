package main

import (
	"github.com/gin-gonic/gin"
	_ "server/component/config"
	_ "server/component/mysql"
)

func main() {
	g := gin.New()
	Router(g)
	g.Run(":3003")
}
