package mysql

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"server/component/config"
	"server/logic/orm/dal"
)

func init() {
	db, err := gorm.Open(mysql.Open(config.Config.GetString("mysql.dsn")))
	if err != nil {
		panic(fmt.Errorf("cannot establish db connection: %w", err))
	}
	dal.SetDefault(db)
}
