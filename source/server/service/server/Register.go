package server

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	helper_gen "github.com/langwan/langgo/helpers/gen"
	"gorm.io/gorm"
	"server/logic/orm/dal"
	"server/logic/orm/model"
	logicPassword "server/logic/password"
	logicToken "server/logic/token"
	"server/service/h"
	"time"
)

type RegisterRequest struct {
	Phone    string `json:"phone" binding:"required,len=11" label:"手机号"`
	Password string `json:"password" binding:"required,len=40" label:"密码"`
	Nickname string `json:"nickname" binding:"required,min=6,max=32" label:"昵称"`
}

type RegisterResponse struct {
	Token string `json:"token" `
}

func Register(c *gin.Context) {
	var request RegisterRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		h.Validator(c, err)
		return
	}
	_, err := dal.Account.Where(dal.Account.Phone.Eq(request.Phone)).First()
	if err != gorm.ErrRecordNotFound {
		if err != nil {
			h.Fail(c, err)
		} else {
			h.ValidatorError(c, "Phone", "手机号已经被注册")
		}
		return
	}
	salt, _ := helper_gen.RandString(16)
	password := logicPassword.Hash(request.Password, salt)
	acc := model.Account{
		ID:       helper_gen.UuidShort(),
		Phone:    request.Phone,
		Nickname: request.Nickname,
		Password: password,
		Salt:     salt,
	}
	err = dal.Account.Create(&acc)
	if err != nil {
		h.Fail(c, err)
		return
	}

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
}
