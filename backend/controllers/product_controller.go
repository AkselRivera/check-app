package controllers

import (
	"context"
	"fmt"
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
	"go.mongodb.org/mongo-driver/mongo/options"
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
	// data, err := productCollection.Find(context.TODO(), bson.D{})
	// if err != nil {
	// 	return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	// }

	pipeline := []bson.M{
		{
			"$addFields": bson.M{
				"family_id": bson.M{
					"$toObjectId": "$family_id",
				},
			},
		},
		{
			"$lookup": bson.M{
				"from":         "family",
				"localField":   "family_id",
				"foreignField": "_id",
				"as":           "family",
			},
		},
		{
			"$unwind": bson.M{
				"path":                       "$family",
				"preserveNullAndEmptyArrays": true,
			},
		},
	}

	data, err := productCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var products []models.Product
	if err := data.All(context.TODO(), &products); err != nil {
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

	var familyExist models.Family
	id, _ := primitive.ObjectIDFromHex(product.Family_id)

	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.M{
		"_id": id,
	}

	update := bson.M{
		"$inc": bson.D{
			{Key: "total", Value: product.Total},
			{Key: "products_count", Value: product.Quantity},
		},
	}

	familyCollection.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&familyExist)

	if familyExist.Id.IsZero() {
		return c.Status(http.StatusConflict).JSON(responses.ErrorResponse{Status: http.StatusConflict, Message: "error", Data: &fiber.Map{"data": "Family not found in DB."}})
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

	family_id, _ := primitive.ObjectIDFromHex(product.Family_id)
	familyFilter := bson.M{
		"_id": family_id,
	}

	// First we check if the [family_id] exist
	if resp := familyCollection.FindOne(context.TODO(), familyFilter); resp.Err() != nil {

		if resp.Err() == mongo.ErrNoDocuments {
			custom_msg := fmt.Sprintf("Family not found with ID %v", family_id)
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": custom_msg}})
		}

		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": resp.Err().Error()}})
	}

	id, _ := primitive.ObjectIDFromHex(productID)
	filter := bson.M{
		"_id": id,
	}

	var oldProduct models.Product
	oldErr := productCollection.FindOne(context.TODO(), filter).Decode(&oldProduct)

	if oldErr != nil {
		if oldErr == mongo.ErrNoDocuments {
			custom_msg := fmt.Sprintf("Product not found with ID %v", id)
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": custom_msg}})

		}
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": oldErr.Error()}})
	}

	update := bson.D{{Key: "$set", Value: bson.M{
		"name":      product.Name,
		"family_id": product.Family_id,
		"quantity":  product.Quantity,
		"unitprice": product.UnitPrice,
		"total":     product.Total,
	}}}

	// We update the DB collection
	var updatedData models.Product
	opts := options.FindOneAndUpdate().SetUpsert(true)

	productCollection.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedData)

	if updatedData.Id.IsZero() {
		custom_msg := fmt.Sprintf("Product with ID %v not found", id)
		return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": custom_msg}})
	}

	var quantityDiff int
	var totalDiff float64

	//* If its the same family _id we increment or decrement @Quantity and @Total.
	if product.Family_id == oldProduct.Family_id {
		quantityDiff = product.Quantity - oldProduct.Quantity
		totalDiff = product.Total - oldProduct.Total

	} else {
		/* If it isnt the same family_id we drecremt @Quantity and @Total to the previous family_id
		and we added to the new family_id. */

		oldFamily_id, _ := primitive.ObjectIDFromHex(oldProduct.Family_id)
		quantityDiff = product.Quantity
		totalDiff = product.Total

		family_update := bson.M{
			"$inc": bson.D{
				{Key: "products_count", Value: (quantityDiff * -1)},
				{Key: "total", Value: (totalDiff * -1)},
			},
		}

		_, errFam := familyCollection.UpdateOne(context.TODO(), bson.M{"_id": oldFamily_id}, family_update)
		if errFam != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": errFam.Error()}})
		}
	}

	family_update := bson.M{
		"$inc": bson.D{
			{Key: "products_count", Value: quantityDiff},
			{Key: "total", Value: totalDiff},
		},
	}

	_, errFam := familyCollection.UpdateOne(context.TODO(), bson.M{"_id": family_id}, family_update)
	if errFam != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": errFam.Error()}})
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
	var oldProduct models.Product
	oldErr := productCollection.FindOne(context.TODO(), filter).Decode(&oldProduct)

	if oldErr != nil {
		if oldErr == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": oldErr.Error()}})
		}
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": oldErr.Error()}})
	}

	quantityDiff := oldProduct.Quantity * -1
	totalDiff := oldProduct.Total * -1

	family_id, _ := primitive.ObjectIDFromHex(oldProduct.Family_id)

	family_update := bson.M{
		"$inc": bson.D{
			{Key: "products_count", Value: quantityDiff},
			{Key: "total", Value: totalDiff},
		},
	}

	_, errFam := familyCollection.UpdateOne(context.TODO(), bson.M{"_id": family_id}, family_update)
	if errFam != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": errFam.Error()}})
	}

	resp, err := productCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if resp.DeletedCount == 0 {
		return c.Status(http.StatusNotFound).JSON(responses.ErrorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": oldErr.Error()}})
	}
	return c.Status(http.StatusNoContent).JSON("Product deleted successfully")
}
