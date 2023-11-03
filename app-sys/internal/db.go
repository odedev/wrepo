package internal

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func DB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true, // use singular table name, table for `User` would be `user` with this option enabled
			// NoLowerCase:   true,                              // skip the snake_casing of names
			// TablePrefix:   "t_",                              // table name prefix, table for `User` would be `t_users`
			// NameReplacer:  strings.NewReplacer("CID", "Cid"), // use name replacer to change struct/field name before convert it to db name
		},
		PrepareStmt:            true,  // 缓存预编译语句
		SkipDefaultTransaction: false, // 禁用默认事务
	})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}
