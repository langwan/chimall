package logicCart

import "encoding/json"

const (
	RedisPrefix = "cart"
)

type CartItem struct {
	GoodsId string `json:"goodsId"`
	Numbers int    `json:"numbers"`
}

func (c *CartItem) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, c)
}

func (c *CartItem) FromRedis(data interface{}) error {
	str := data.(string)
	return json.Unmarshal([]byte(str), c)
}

func (c *CartItem) MarshalBinary() (data []byte, err error) {
	return json.Marshal(c)
}

func KeyCard(uid string) string {
	return RedisPrefix + "." + uid
}

func KeyCardItem(uid, goodsId string) string {
	return RedisPrefix + "." + uid + "." + goodsId
}
