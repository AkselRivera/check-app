package routes

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Product struct {
	Id        string  `json:"id" xml:"id" form:"id"`
	Name      string  `json:"name" xml:"name" form:"name"`
	Quantity  int     `json:"quantity" xml:"quantity" form:"quantity"`
	Family_id string  `json:"family_id" xml:"family_id" form:"family_id"`
	UnitPrice float64 `json:"unitPrice" xml:"unit_price" form:"unitPrice"`
	Total     float64 `json:"total" xml:"total" form:"total"`
}

type Family struct {
	Id             string  `json:"id" xml:"id" form:"id"`
	Name           string  `json:"name" xml:"name" form:"name"`
	Total          float64 `json:"total" xml:"total" form:"total"`
	Products_count int     `json:"products_count" xml:"products_count" form:"products_count"`
}

var Families = []Family{
	{
		Id:    "default",
		Name:  "Default",
		Total: 0,
	},
}
var listProducts []Product

func ProductRoutes(router fiber.Router) {
	router.Get("/")

}

func TestFunc(c *fiber.Ctx) error {

	return c.SendString("Hello, World!")
}

func GetCheck(c *fiber.Ctx) error {

	return c.JSON(listProducts)
}

// TODO: Refactor with backend query functions
func AddProduct(c *fiber.Ctx) error {
	product := new(Product)

	if err := c.BodyParser(&product); err != nil {
		log.Printf("Error parsing JSON: %v", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Error parsing JSON",
		})
	}

	for index, val := range Families {
		if product.Family_id == val.Id {
			product.Id = uuid.NewString()
			Families[index].Total = val.Total + product.Total

			listProducts = append(listProducts, *product)

			return c.JSON(product)
		}
	}
	return c.Status(404).JSON(fiber.Map{
		"error": "Family ID not found",
	})
}

// TODO: Refactor with backend query functions
func UpdateProduct(c *fiber.Ctx) error {
	productID := c.Params("id")
	product := new(Product)

	if err := c.BodyParser(&product); err != nil {
		log.Printf("Error parsing JSON: %v", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Error parsing JSON",
		})
	}

	for _, val := range Families {
		if product.Family_id == val.Id {

			for index, prod := range listProducts {
				if prod.Id == productID {
					product.Id = productID
					listProducts[index] = *product
					return c.JSON(listProducts[index])
				}
			}
			return c.Status(404).JSON(fiber.Map{
				"error": "Product ID not found",
			})
		}
	}
	return c.Status(404).JSON(fiber.Map{
		"error": "Family ID not found",
	})
}

// TODO: Refactor with backend query functions
func DeleteProduct(c *fiber.Ctx) error {
	productID := c.Params("id")

	for index, prod := range listProducts {
		if prod.Id == productID {
			listProducts = append(listProducts[:index], listProducts[index+1:]...)
			return c.JSON(listProducts)
		}
	}
	return c.Status(404).JSON(fiber.Map{
		"error": "Product ID not found",
	})

}

func NewFamily(c *fiber.Ctx) error {

	fam := new(Family)

	if err := c.BodyParser(fam); err != nil {
		return err
	}
	fam.Id = uuid.NewString()
	Families = append(Families, *fam)

	return c.JSON(fam)
}

func GetFamilies(c *fiber.Ctx) error {
	for index := range Families {
		Families[index].Products_count = 0
		familyID := Families[index].Id
		for _, product := range listProducts {
			if familyID == product.Family_id {

				Families[index].Products_count += product.Quantity
			}
		}
	}
	return c.JSON(Families)
}

func DeleteFamily(c *fiber.Ctx) error {
	familyID := c.Params("id")

	for index, fam := range Families {
		if fam.Id == familyID {
			Families = append(Families[:index], Families[index+1:]...)
			return c.JSON(Families)
		}
	}
	return c.Status(404).JSON(fiber.Map{
		"error": "Family ID not found",
	})

}

func GetTotalPerFam(c *fiber.Ctx) error {

	return c.JSON(Families)
}
