package logicToken

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"server/component/config"
)

type Token struct {
	Uid      string `json:"uid"`
	Nickname string `json:"nickname"`
	jwt.StandardClaims
}

func Sign(token *Token) (string, error) {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, token).SignedString([]byte(config.Config.GetString("jwt.key")))
}

func Parse(sign string) (*Token, error) {
	tokenClaims, err := jwt.ParseWithClaims(sign, &Token{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Config.GetString("jwt.key")), nil
	})
	if err != nil {
		return nil, err
	} else {
		if tokenClaims != nil {
			if claims, ok := tokenClaims.Claims.(*Token); ok && tokenClaims.Valid {
				return claims, nil
			} else {
				return nil, errors.New("claims error")
			}
		} else {
			return nil, errors.New("claims error")
		}
	}
}
