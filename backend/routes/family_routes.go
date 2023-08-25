package routes

import (
	"github.com/AkselRivera/check-app/controllers"
	"github.com/gofiber/fiber/v2"
)

func FamilyRoutes(router fiber.Router) {
	router.Get("/", controllers.GetFamily)
	router.Post("/", controllers.CreateFamily)
	router.Patch("/:id", controllers.UpdateProduct)
	router.Delete("/:id", controllers.DeleteProduct)

}
