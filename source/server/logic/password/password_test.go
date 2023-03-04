package logicPassword

import "testing"

func TestHash(t *testing.T) {
	hash := Hash("123456", "1234")
	t.Log(hash)
}
