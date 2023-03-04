package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"server/component/config"
	_ "server/component/config"
	"server/logic/orm/dal"
	serviceAccount "server/service/account/account"
	serviceOrder "server/service/account/order"
	"server/service/h"
	"server/service/server"
)

func main() {

	db, err := gorm.Open(mysql.Open(config.Config.GetString("mysql.dsn")))
	if err != nil {
		panic(fmt.Errorf("cannot establish db connection: %w", err))
	}
	dal.SetDefault(db)

	g := gin.New()

	//登录 注册 忘记密码 注销
	g.POST("/login", server.Login)
	g.POST("/register", server.Register)
	g.POST("/logout", server.Logout)

	account := g.Group("/account")
	account.Use(h.Auth())
	order := account.Group("/order")
	order.POST("/list", serviceOrder.List)
	order.POST("/get", serviceOrder.Get)

	account.POST("/profile", serviceAccount.Profile)

	g.Run(":8080")
}
