package serviceCart

import (
	"github.com/gin-gonic/gin"
	logicCart "server/logic/cart"
	"server/service/h"
)

func List(c *gin.Context) {
	tk := h.GetToken(c)
	list, err := logicCart.List(tk.Uid)
	if err != nil {
		return
	}
	h.Ok(c, list)
}
