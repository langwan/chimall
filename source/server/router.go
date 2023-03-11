package main

import (
	"github.com/gin-gonic/gin"
	serviceAccount "server/service/account/account"
	serviceGoods "server/service/account/goods"
	serviceOrder "server/service/account/order"
	serviceApp "server/service/app/home"
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

	app := v1.Group("/app")
	{
		app.GET("/home", serviceApp.Home)
	}

	account := v1.Group("/account")
	account.Use(h.Auth())

	goods := account.Group("/goods")
	goods.GET("/get", serviceGoods.Get)
	order := account.Group("/order")
	order.POST("/list", serviceOrder.List)
	order.POST("/get", serviceOrder.Get)

	account.POST("/profile", serviceAccount.Profile)
}
