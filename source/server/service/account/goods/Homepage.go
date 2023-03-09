package serviceGoods

import (
	"github.com/gin-gonic/gin"
	"server/helper"
	"server/logic/orm/dal"
	"server/logic/orm/model"
	"server/service/h"
)

type HomepageFeed struct {
	Id            string `json:"id"`
	Name          string `json:"name"`
	Price         string `json:"price"`
	OriginalPrice string `json:"originalPrice"`
	Img           string `json:"img"`
	Dest          string `json:"dest"`
}

type HomepageResponse struct {
	Blocks map[string][]*HomepageFeed `json:"blocks"`
}

func Homepage(c *gin.Context) {
	blocks, err := dal.Block.Find()
	if err != nil {
		return
	}
	resp := HomepageResponse{Blocks: make(map[string][]*HomepageFeed)}

	var ids []string
	for _, block := range blocks {
		ids = append(ids, block.GoodsID)
	}

	ids = helper.RemoveDuplicateInt64(ids)

	items, err := dal.Good.Where(dal.Good.ID.In(ids...)).Find()

	m := make(map[string]*model.Good)
	for _, item := range items {
		m[item.ID] = item
	}

	for _, block := range blocks {
		if goods, ok := m[block.GoodsID]; ok {
			resp.Blocks[block.Key] = append(resp.Blocks[block.Key], &HomepageFeed{
				Id:            goods.ID,
				Name:          goods.Name,
				Price:         goods.Price.String(),
				OriginalPrice: goods.OriginalPrice.String(),
				Img:           goods.Img,
				Dest:          goods.Desc,
			})
		}

	}
	h.Ok(c, &resp)
}
