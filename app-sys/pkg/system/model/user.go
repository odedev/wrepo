package model


type User struct {
	ID       string `json:"id"`
	Code     string `json:"code"`
	Username string `json:"username"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Type    int8   `json:"type"`
	Status  int8   `json:"status"`
	IsAdmin bool   `json:"isValid"`
}
