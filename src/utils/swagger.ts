import { FastifyRegisterOptions } from "fastify";
import { SwaggerOptions } from "@fastify/swagger";
import { version } from "../../package.json";
const port = parseInt(process.env.PORT ?? "8080", 10);
export const swaggerObj: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  prefix: "/api",
  mode: "dynamic",

  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },

  openapi: {
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "query",
        },
        jwt: {
          type: "http",
          bearerFormat: "Bearer",
          scheme: "bearer",
        },
      },
    },
    info: {
      title: "Foodie API",
      description: "API for Foodie",
      version,
    },
    servers: [{ url: `http://localhost:${port}/api` }],
  },
};
