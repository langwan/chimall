package serviceCart

import (
	"github.com/gin-gonic/gin"
	"server/service/h"
)

type NumberRequest struct {
	Number int  `json:"number"`
	IsAdd  bool `json:"isAdd"`
}

func Number(c *gin.Context) {
	h.Ok(c, true)
}
