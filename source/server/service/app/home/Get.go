package serviceApp

import (
	"github.com/gin-gonic/gin"
	"server/helper"
	"server/logic/orm/dal"
	"server/logic/orm/model"
	serviceGoods "server/service/account/goods"
	"server/service/h"
)

type HomeResponse struct {
	Blocks  map[string][]*serviceGoods.GoodRes `json:"blocks"`
	Banners []string                           `json:"banners"'`
}

func Home(c *gin.Context) {
	blocks, err := dal.Block.Find()
	if err != nil {
		return
	}

	resp := HomeResponse{
		Blocks:  make(map[string][]*serviceGoods.GoodRes),
		Banners: make([]string, 0, 4),
	}

	var blockIds []string
	var slideIds []string

	for _, block := range blocks {

		if block.Key == "slides" {
			slideIds = append(slideIds, block.GoodsID)
		} else {
			blockIds = append(blockIds, block.GoodsID)
		}
	}

	ids := helper.RemoveDuplicateInt64(append(blockIds, slideIds...))

	items, err := dal.Good.Where(dal.Good.ID.In(ids...)).Find()

	m := make(map[string]*model.Good)

	for _, item := range items {
		m[item.ID] = item
	}

	for _, block := range blocks {
		if goods, ok := m[block.GoodsID]; ok {
			if block.Key != "slides" {
				resp.Blocks[block.Key] = append(resp.Blocks[block.Key], &serviceGoods.GoodRes{
					Id:            goods.ID,
					Name:          goods.Name,
					Price:         goods.Price.String(),
					OriginalPrice: goods.OriginalPrice.String(),
					Img:           goods.Img,
					Dest:          goods.Desc,
				})
			}
		}
	}

	for _, slideId := range slideIds {
		if goods, ok := m[slideId]; ok {
			if goods.SwiperImg != "" {
				resp.Banners = append(resp.Banners, goods.SwiperImg)
			}
		}
	}
	h.Ok(c, &resp)
}
