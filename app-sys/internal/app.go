package internal

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func App() *gin.Engine {
	gin.SetMode(gin.DebugMode)
	// gin.SetMode(gin.ReleaseMode)

	app := gin.Default()

	app.MaxMultipartMemory = 8 << 20 // 8 MiB

	// 全局中间件
	// Logger 中间件将日志写入 gin.DefaultWriter，即使你将 GIN_MODE 设置为 release。
	// By default gin.DefaultWriter = os.Stdout
	// app.Use(gin.Logger())

	// // Recovery 中间件会 recover 任何 panic。如果有 panic 的话，会写入 500。
	app.Use(gin.Recovery())

	app.Use(cors.Default())
	app.Use(gzip.Gzip(gzip.DefaultCompression))

	return app
}
