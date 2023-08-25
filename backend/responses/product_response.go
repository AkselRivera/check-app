package responses

type ProductRespone struct {
	Id        string  `json:"id" xml:"id" form:"id"`
	Name      string  `json:"name" xml:"name" form:"name"`
	Quantity  int     `json:"quantity" xml:"quantity" form:"quantity"`
	Family_id string  `json:"family_id" xml:"family_id" form:"family_id"`
	UnitPrice float64 `json:"unitPrice" xml:"unit_price" form:"unitPrice"`
	Total     float64 `json:"total" xml:"total" form:"total"`
}
