package serviceGoods

import (
	"errors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"server/logic/orm/dal"
	"server/service/h"
)

type GetRequest struct {
	Id string `json:"id"`
}

type GoodRes struct {
	Id            string `json:"id"`
	Name          string `json:"name"`
	Price         string `json:"price"`
	OriginalPrice string `json:"originalPrice"`
	Img           string `json:"img"`
	Dest          string `json:"dest"`
}

func Get(c *gin.Context) {
	var req GetRequest
	c.ShouldBindJSON(&req)

	goods, err := dal.Good.Where(dal.Good.ID.Eq(req.Id)).First()
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		h.FailMessage(c, "商品不存在")
		return
	} else if err != nil {
		h.Fail(c, err)
		return
	}

	h.Ok(c, &GoodRes{
		Id:            goods.ID,
		Name:          goods.Name,
		Price:         goods.Price.String(),
		OriginalPrice: goods.OriginalPrice.String(),
		Img:           goods.Img,
		Dest:          goods.Desc,
	})

}
