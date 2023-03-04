package serviceOrder

import (
	"errors"
	"github.com/gin-gonic/gin"
	h "server/service/h"
)

type GetRequest struct {
	Id int64 `json:"id"`
}

func Get(c *gin.Context) {
	var req GetRequest
	c.ShouldBindJSON(&req)

	h.Fail(c, errors.New("还没实现哦"))

}
