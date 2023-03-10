package server

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"server/logic/orm/dal"
	logicPassword "server/logic/password"
	logicToken "server/logic/token"
	"server/service/h"
	"time"
)

type LoginRequest struct {
	Phone    string `json:"phone" binding:"required,len=11" label:"手机号"`
	Password string `json:"password" binding:"required,len=40" label:"密码"`
}

type LoginResponse struct {
	Token string `json:"token" `
}

func Login(c *gin.Context) {
	var request LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		h.Validator(c, err)
		return
	}

	acc, err := dal.Account.Where(dal.Account.Phone.Eq(request.Phone)).First()
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		h.FailMessage(c, "账号不存在")
		return
	} else if err != nil {
		h.Fail(c, err)
		return
	}

	if len(acc.Password) > 0 && acc.Password == logicPassword.Hash(request.Password, acc.Salt) {

		token := logicToken.Token{
			Uid:      acc.ID,
			Nickname: acc.Nickname,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(7 * 24 * time.Hour).UnixMilli(),
			},
		}

		if sign, err := logicToken.Sign(&token); err == nil {
			h.SetCookie(c, "token", sign)
			h.Ok(c, "ok")
		} else {
			h.Fail(c, err)
		}

	} else {

		h.ValidatorError(c, "Password", "密码错误")
	}

}
