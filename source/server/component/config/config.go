package config

import (
	"github.com/spf13/viper"
	"os"
)

var Config *viper.Viper

func init() {
	Config = viper.New()
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	Config.AddConfigPath(wd)
	Config.SetConfigName("config")
	Config.SetConfigType("yaml")

	if err := Config.ReadInConfig(); err != nil {
		panic(err)
	}

}
