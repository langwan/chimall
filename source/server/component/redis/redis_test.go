package redis

import "testing"

func TestConn(t *testing.T) {
	instance.Set("test", "test1", 0)
	cmd := instance.Get("test")
	t.Log(cmd)
}
