package serviceCart

import (
	"github.com/gin-gonic/gin"
	logicCart "server/logic/cart"
	"server/service/h"
)

type AddRequest struct {
	GoodsId string `json:"goodsId"`
}

func Add(c *gin.Context) {

	// 查询还是不查询？

	var req AddRequest
	c.ShouldBindJSON(&req)
	tk := h.GetToken(c)
	_, err := logicCart.Add(tk.Uid, req.GoodsId, 1)
	h.OkFail(c, true, err)
}
