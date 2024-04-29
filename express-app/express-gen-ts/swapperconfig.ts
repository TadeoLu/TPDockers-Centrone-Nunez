import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Festivales API",
      version: "1.0.0",
      description: "Descripción de tu API",
    },
  },
  apis: ["./src/routes/*.ts"], // Rutas donde están definidas las operaciones
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
