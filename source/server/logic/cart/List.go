package logicCart

import (
	"server/component/redis"
)

func List(uid string) (items []*CartItem, err error) {
	members := redis.SMembers(KeyCard(uid))
	var ids []string
	for _, goodsId := range members.Val() {
		ids = append(ids, KeyCardItem(uid, goodsId))
	}

	mget := redis.MGet(ids...)
	if mget.Err() == nil {
		for _, data := range mget.Val() {
			var item CartItem
			item.FromRedis(data)
			items = append(items, &item)
		}
	}

	return items, nil
}
