import { FastifyRegisterOptions } from "fastify";
import { SwaggerOptions } from "fastify-swagger";
import { version } from "../../package.json";
const port = parseInt(process.env.PORT ?? "8080", 10);
export const swaggerObj: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  routePrefix: "/api/doc",
  prefix: "/api",
  exposeRoute: true,
  staticCSP: true,

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
