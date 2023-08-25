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
var productValidator = validator.New()

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

	var products []models.Product

	if err := data.All(context.Background(), &products); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(products)
	// return c.Status(http.StatusOK).JSON(responses.ProductRespone{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})
}

func CreateProduct(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// userId := c.Params("userId")

	var product models.Product
	defer cancel()
	//Validate the request body
	if err := c.BodyParser(&product); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := productValidator.Struct(&product); validationErr != nil {
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

func UpdateProduct(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	productID := c.Params("id")
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := productValidator.Struct(&product); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	id, _ := primitive.ObjectIDFromHex(productID)
	filter := bson.M{
		"_id": id,
	}

	// First we check if the _id exist
	if resp := productCollection.FindOne(context.TODO(), filter); resp.Err() != nil {

		if resp.Err() == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Product ID not found."}})
		}

		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": resp.Err().Error()}})
	}

	update := bson.D{{Key: "$set", Value: bson.M{
		"name":      product.Name,
		"family_id": product.Family_id,
		"quantity":  product.Quantity,
		"unitprice": product.UnitPrice,
		"total":     product.Total,
	}}}

	// We update the DB collection
	res, err := productCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	// We check if the modified is equal to 0, it means nothing was modified
	if res.ModifiedCount == 0 {
		return c.Status(http.StatusNotModified).JSON(responses.ErrorResponse{Status: http.StatusNotModified, Message: "error", Data: &fiber.Map{"data": "Content not modified"}})
	}

	// We find the the modified document to return it
	var updatedData models.Product
	err = productCollection.FindOne(context.TODO(), filter).Decode(&updatedData)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(updatedData)
}

func DeleteProduct(c *fiber.Ctx) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	productID := c.Params("id")

	id, _ := primitive.ObjectIDFromHex(productID)
	filter := bson.M{
		"_id": id,
	}

	// First we check if the _id exist
	if resp := productCollection.FindOne(context.TODO(), filter); resp.Err() != nil {

		if resp.Err() == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Product ID not found."}})
		}

		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": resp.Err().Error()}})
	}

	resp, err := productCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if resp.DeletedCount == 0 {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": "Something went wrong try it later."}})
	}
	return c.Status(http.StatusNoContent).JSON("Product deleted successfully")
}
