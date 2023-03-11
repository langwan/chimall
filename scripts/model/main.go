package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gorm"
)

const dsn = "chimall:password@tcp(localhost:3306)/chimall?charset=utf8mb4&parseTime=True&loc=Local"

type GoodsMethod struct {
	ID   int32
	Name *string
}

func (m GoodsMethod) TableName() string {
	return "goods"
}

func main() {
	db, err := gorm.Open(mysql.Open(dsn))
	if err != nil {
		panic(fmt.Errorf("cannot establish db connection: %w", err))
	}
	// 生成实例
	g := gen.NewGenerator(gen.Config{
		OutPath:      "../../source/server/logic/orm/dal",
		ModelPkgPath: "../../source/server/logic/orm/model",
		Mode:         gen.WithDefaultQuery | gen.WithoutContext,
	})
	// 设置目标 db
	g.UseDB(db)
	g.ApplyBasic(g.GenerateModel("accounts"), g.GenerateModel("blocks"), g.GenerateModel("goods", gen.FieldType("price", "decimal.Decimal"), gen.FieldType("original_price", "decimal.Decimal")))
	g.Execute()
}
