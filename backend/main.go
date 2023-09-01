package main

import (
	"github.com/AkselRivera/check-app/config"
	"github.com/AkselRivera/check-app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	port := config.EnvPort()
	if len(port) == 0 {
		port = ":8080"
	}

	app := fiber.New()
	config.ConnectDB()

	defer func() {
		config.DisconnectDB(config.DB)
	}()

	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	app.Use(cors.New())

	// TODO: GET Statics here
	app.Static("/", "./dist")
	// app.Get("/", routes.TestFunc)

	api := app.Group("/api/v1")
	apiProduct := api.Group("/product")
	apiFamily := api.Group("/family")

	routes.ProductRoutes(apiProduct)
	routes.FamilyRoutes(apiFamily)

	// api.Post("/family", routes.NewFamily)
	// api.Get("/families", routes.GetFamilies)
	// api.Delete("/family/:id", routes.DeleteFamily)

	// api.Get("/mongo", service.GetProducts)
	// api.Post("/mongo", service.CreateProduct)

	app.Listen(":" + port)
}
