package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Family struct {
	Id             primitive.ObjectID `bson:"_id" json:"id"`
	Name           string             `json:"name,omitempty" validate:"required" `
	Products_count int                `json:"products_count,omitempty" `
	Total          float64            `json:"total,omitempty" `
}
