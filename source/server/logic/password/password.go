package logicPassword

import (
	"crypto/hmac"
	"crypto/sha1"
	"fmt"
)

func Hash(password, salt string) string {
	mac := hmac.New(sha1.New, []byte(password))
	mac.Write([]byte(salt))
	hs := mac.Sum(nil)
	return fmt.Sprintf("%x", hs)
}
