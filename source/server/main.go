package main

import (
	"github.com/gin-gonic/gin"
	_ "server/component/config"
	_ "server/component/mysql"
	"server/service/h"
)

func main() {
	g := gin.Default()

	g.Use(h.Logger(), gin.Recovery())
	Router(g)
	g.Run(":3003")
}
