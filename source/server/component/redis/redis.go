package redis

import (
	"github.com/go-redis/redis"
	"server/component/config"
	"time"
)

var instance *redis.Client

func init() {
	instance = redis.NewClient(&redis.Options{Addr: config.Config.GetString("redis.addr")})
}

func Set(key string, value interface{}, expiration time.Duration) *redis.StatusCmd {
	return instance.Set(key, value, expiration)
}

func Get(key string) *redis.StringCmd {
	return instance.Get(key)
}

func Del(keys ...string) *redis.IntCmd {
	return instance.Del(keys...)
}

func MGet(keys ...string) *redis.SliceCmd {

	return instance.MGet(keys...)
}

func SAdd(key string, members ...interface{}) *redis.IntCmd {
	return instance.SAdd(key, members...)
}

func SMembers(key string) *redis.StringSliceCmd {
	return instance.SMembers(key)
}
