package entity

import (
	"gorm.io/gorm"
)

type User struct {
	ID       string `gorm:"size:32;not null;comment:主键ID;primaryKey;"`
	Code     string `gorm:"size:32;not null;comment:编码;unique;"`
	Username string `gorm:"size:32;default:'';not null;comment:用户名;unique;"`
	Password string `gorm:"size:255;default:'';not null;comment:密码;"`
	Phone    string `gorm:"size:11;default:'';comment:手机;"`
	Email    string `gorm:"size:64;default:'';comment:邮箱;"`
	Type     int8   `gorm:"default:1;comment:用户类型;"`
	Status   int8   `gorm:"default:0;comment:状态;"`
	IsAdmin  bool   `gorm:"default:0;comment:是否管理员;"`

}

func (entity *User) BeforeCreate(db *gorm.DB) (err error) {
	return
}
