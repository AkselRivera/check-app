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

var productCollection *mongo.Collection = config.GetCollection(config.DB, "products")
var validate = validator.New()

func GetProducts(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// userId := c.Params("userId")
	// var product models.Product
	defer cancel()

	// objId, _ := primitive.ObjectIDFromHex(userId)

	// err := productCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user)
	data, err := productCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(data)
	// return c.Status(http.StatusOK).JSON(responses.ProductRespone{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})
}

func CreateProduct(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// userId := c.Params("userId")

	var product models.Product
	defer cancel()
	//validate the request body
	if err := c.BodyParser(&product); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&product); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newProduct := models.Product{
		Id:        primitive.NewObjectID(),
		Name:      product.Name,
		Family_id: product.Family_id,
		Quantity:  product.Quantity,
		UnitPrice: product.UnitPrice,
		Total:     product.Total,
	}

	_, err := productCollection.InsertOne(context.TODO(), newProduct)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(newProduct)
}
