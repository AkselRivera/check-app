package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	Id        primitive.ObjectID `bson:"_id" json:"id"`
	Name      string             `json:"name,omitempty" validate:"required" `
	Quantity  int                `json:"quantity,omitempty" validate:"required" `
	Family_id string             `json:"family_id,omitempty" validate:"required" `
	UnitPrice float64            `json:"unitPrice,omitempty" validate:"required" `
	Total     float64            `json:"total,omitempty" validate:"required" `
}
