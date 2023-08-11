package main

import (
	"github.com/AkselRivera/check-app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	app.Use(cors.New())
	// TODO: GET Statics here
	app.Get("/", routes.TestFunc)

	api := app.Group("/api/v1")
	api.Get("/check", routes.GetCheck)

	api.Get("/product", routes.GetCheck)
	api.Post("/product", routes.AddProduct)
	api.Patch("/product/:id", routes.UpdateProduct)
	api.Delete("/product/:id", routes.DeleteProduct)

	api.Post("/family", routes.NewFamily)
	api.Get("/families", routes.GetFamilies)
	api.Delete("/family/:id", routes.DeleteFamily)

	app.Listen(":80")
}
