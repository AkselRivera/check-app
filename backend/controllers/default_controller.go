package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/AkselRivera/check-app/config"
	"github.com/AkselRivera/check-app/responses"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ResetServer(c *fiber.Ctx) error {

	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	type Body struct {
		Password string `json:"password" `
	}

	var body Body

	if err := c.BodyParser(&body); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	pass := config.GetPassword()
	if body.Password == pass {

		defaultFamily, _ := primitive.ObjectIDFromHex("64e845ded3b4babed2b85043")

		familyFilter := bson.M{
			"_id": bson.M{
				"$ne": defaultFamily,
			},
		}

		update := bson.M{
			"$set": bson.M{
				"products_count": 0,
				"total":          0,
			},
		}

		productsDeletes, errProduct := productCollection.DeleteMany(context.TODO(), bson.M{})
		familyDeletes, errFamily := familyCollection.DeleteMany(context.TODO(), familyFilter)

		familyCollection.UpdateOne(context.TODO(), bson.M{"_id": defaultFamily}, update)

		if errProduct != nil || errFamily != nil {
			var err error
			if errFamily != nil {
				err = errFamily
			} else {
				err = errProduct
			}
			return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		return c.Status(http.StatusOK).JSON(fiber.Map{
			"msg":      "DB reset successfully performed",
			"products": productsDeletes.DeletedCount,
			"family":   familyDeletes.DeletedCount,
		})
	} else {
		return c.Status(http.StatusUnauthorized).JSON(responses.ErrorResponse{Status: http.StatusUnauthorized, Message: "error", Data: &fiber.Map{"data": "Not authorized"}})

	}

}
