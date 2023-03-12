package logicCart

import (
	"fmt"
	"server/component/redis"
)

func Add(uid, goodsId string, number int) (*CartItem, error) {
	var cartItem *CartItem
	get := redis.Get(KeyCardItem(uid, goodsId))

	if len(get.Val()) > 0 {
		cartItem = &CartItem{}
		get.Scan(cartItem)

	}

	if cartItem == nil {
		cartItem = &CartItem{
			GoodsId: goodsId,
			Numbers: 0,
		}
	}

	cartItem.Numbers += number
	set := redis.Set(KeyCardItem(uid, goodsId), cartItem, 0)
	fmt.Println(KeyCardItem(uid, goodsId), set.Err())
	redis.SAdd(KeyCard(uid), goodsId)
	return cartItem, nil
}
