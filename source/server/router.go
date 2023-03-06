package main

import (
	"github.com/gin-gonic/gin"
	serviceAccount "server/service/account/account"
	serviceOrder "server/service/account/order"
	"server/service/h"
	"server/service/server"
)

func Router(g *gin.Engine) {

	v1 := g.Group("api/v1")

	{
		//登录 注册 忘记密码 注销
		v1.POST("/login", server.Login)
		v1.POST("/register", server.Register)
		v1.POST("/logout", server.Logout)
	}

	account := v1.Group("/account")
	account.Use(h.Auth())
	order := account.Group("/order")
	order.POST("/list", serviceOrder.List)
	order.POST("/get", serviceOrder.Get)

	account.POST("/profile", serviceAccount.Profile)
}
