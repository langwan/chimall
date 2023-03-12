package main

import (
	"github.com/gin-gonic/gin"
	serviceAccount "server/service/account/account"
	serviceCart "server/service/account/cart"
	serviceGoods "server/service/account/goods"
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

	{
		goods := account.Group("/goods")
		goods.GET("/homepage", serviceGoods.Homepage)
		goods.GET("/get", serviceGoods.Get)
	}

	{
		order := account.Group("/order")
		order.POST("/list", serviceOrder.List)
		order.POST("/get", serviceOrder.Get)
	}

	{
		cart := account.Group("cart")
		cart.POST("add", serviceCart.Add)
		cart.POST("list", serviceCart.List)
		cart.POST("remove", serviceCart.Remove)
		cart.POST("Number", serviceCart.Number)
	}

	account.POST("/profile", serviceAccount.Profile)
}
