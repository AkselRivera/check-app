package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/AkselRivera/check-app/config"
	"github.com/AkselRivera/check-app/models"
	"github.com/AkselRivera/check-app/responses"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var familyCollection *mongo.Collection = config.GetCollection(config.DB, "family")
var familyValidator = validator.New()

func GetFamily(c *fiber.Ctx) error {

	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// userId := c.Params("userId")
	// var product models.Product
	defer cancel()

	// objId, _ := primitive.ObjectIDFromHex(userId)

	// err := productCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user)
	data, err := familyCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var family []models.Family

	if err := data.All(context.Background(), &family); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(family)
	// return c.Status(http.StatusOK).JSON(responses.ProductRespone{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})
}

func CreateFamily(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// userId := c.Params("userId")

	var family models.Family
	//Validate the request body
	if err := c.BodyParser(&family); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := familyValidator.Struct(&family); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	// First we check if the _id exist
	var familyExist models.Family
	familyCollection.FindOne(context.TODO(), bson.M{"name": family.Name}).Decode(&familyExist)

	if !familyExist.Id.IsZero() {
		return c.Status(http.StatusConflict).JSON(responses.ErrorResponse{Status: http.StatusConflict, Message: "error", Data: &fiber.Map{"data": "Family already stored in DB."}})
	}

	newFamily := models.Family{
		Id:             primitive.NewObjectID(),
		Name:           family.Name,
		Products_count: family.Products_count,
		Total:          family.Total,
	}

	_, err := familyCollection.InsertOne(context.TODO(), newFamily)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(newFamily)
}
