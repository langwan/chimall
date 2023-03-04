package h

import (
	"github.com/gin-gonic/gin/binding"
	localeEn "github.com/go-playground/locales/en"
	localeZhHans "github.com/go-playground/locales/zh_Hans"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/go-playground/validator/v10/translations/zh"
	"reflect"
)

//	var ValidatorMessages = map[string]string{
//		"required": "请输入%s%s",
//		"len":      "%s长度必须等于%s",
//	}
//
//	var ValidatorNames = map[string]string{
//		"LoginRequest.Phone":    "手机号",
//		"LoginRequest.Password": "密码",
//	}
var (
	Trans ut.Translator
)

func init() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		zhHans := localeZhHans.New()
		en := localeEn.New()
		uni := ut.New(zhHans, en)

		Trans, _ = uni.GetTranslator("zhHans")
		err := zh.RegisterDefaultTranslations(v, Trans)
		if err != nil {
			return
		}

		v.RegisterTagNameFunc(func(field reflect.StructField) string {
			return field.Tag.Get("label")
		})

		v.RegisterTranslation("required", Trans, func(ut ut.Translator) error {
			return ut.Add("required", "请输入{0}", true)
		}, func(ut ut.Translator, fe validator.FieldError) string {

			t, err := ut.T(fe.Tag(), fe.Field())
			if err != nil {
				return fe.(error).Error()
			}
			return t
		})
	}
}
