package logicCart

import (
	"server/component/redis"
	"testing"
)
import _ "server/component/config"

func TestAdd(t *testing.T) {
	//redis.Del(KeyCardItem("1", "1"))
	Add("1", "1", 1)
	var cartItem CartItem
	redis.Get(KeyCardItem("1", "1")).Scan(&cartItem)
	t.Log(cartItem)
}

func TestList(t *testing.T) {
	items, err := List("1")
	if err != nil {
		return
	}
	for _, item := range items {
		t.Log(item)
	}
}
