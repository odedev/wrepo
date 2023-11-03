package cmd

import (
	"fmt"

	"app-sys/internal"

	"github.com/gin-gonic/gin"

  system "app-sys/pkg/system/entity"

)

func Main() {
	app := internal.App()
  db := internal.DB()

  err := db.AutoMigrate(
    &system.User{},
  )

  if err != nil {
    fmt.Println("Migrate error")
  }

	app.Static("/public", "./public")

  // 提供 unicode 实体
	app.GET("/json", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"html": "<b>Hello, world!</b>",
		})
	})

	// 提供字面字符
	app.GET("/purejson", func(c *gin.Context) {
		c.PureJSON(200, gin.H{
			"html": "<b>Hello, world!</b>",
		})
	})

	// 监听并在 0.0.0.0:8080 上启动服务
	app.Run(":8080")

}
