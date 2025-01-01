const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const routerPath = path.join(__dirname, "/src/routes/*.js");

const swagger = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coppola ecommerce movie website",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [routerPath],
});

module.exports = swagger;