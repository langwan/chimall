package serviceHome

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

	banners, err := dal.Slide.Find()
	if err != nil {
		return
	}

	resp := HomeResponse{
		Blocks:  make(map[string][]*serviceGoods.GoodRes),
		Banners: make([]string, 0, 4),
	}

	var blockIds []string
	var bannerIds []string

	for _, block := range blocks {
		blockIds = append(blockIds, block.GoodsID)
	}

	for _, banner := range banners {
		bannerIds = append(bannerIds, banner.GoodsID)
	}

	ids := helper.RemoveDuplicateInt64(append(blockIds, bannerIds...))

	items, err := dal.Good.Where(dal.Good.ID.In(ids...)).Find()

	m := make(map[string]*model.Good)

	for _, item := range items {
		m[item.ID] = item
	}

	for _, block := range blocks {
		if goods, ok := m[block.GoodsID]; ok {
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

	for _, banner := range banners {
		if goods, ok := m[banner.GoodsID]; ok {
			if goods.SwiperImg != "" {
				resp.Banners = append(resp.Banners, goods.SwiperImg)
			}
		}
	}
	h.Ok(c, &resp)
}
