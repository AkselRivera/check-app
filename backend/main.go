package main

import (
	"github.com/AkselRivera/check-app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	// TODO: GET Statics here
	app.Get("/", routes.TestFunc)

	api := app.Group("/api/v1")
	api.Get("/check", routes.GetCheck)

	app.Listen(":8000")
}
