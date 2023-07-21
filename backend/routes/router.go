package routes

import (
	"github.com/gofiber/fiber/v2"
)

type Product struct {
	Name      string
	Quantity  int
	Family_id string
	UnitPrice float64
	Total     float64
}

func TestFunc(c *fiber.Ctx) error {

	return c.SendString("Hello, World!")
}

func NewJSON(c *fiber.Ctx) error {

	return c.JSON(fiber.Map{
		"message": "Dummy JSON here",
	})
}

func GetCheck(c *fiber.Ctx) error {

	products := []Product{
		{
			Name:      "Tacos suadero",
			Quantity:  8,
			Family_id: "123456",
			UnitPrice: 21,
			Total:     168,
		},
	}

	return c.JSON(products)
}
