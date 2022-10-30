import { FastifyRegisterOptions } from "fastify";
import { SwaggerOptions } from "@fastify/swagger";
import { version } from "../../package.json";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
const port = parseInt(process.env.PORT ?? "8080", 10);
export const swaggerObj: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  prefix: "/api/doc/",
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

export const swaggerUiObject:
  | FastifyRegisterOptions<FastifySwaggerUiOptions>
  | undefined = {
  routePrefix: "/api/doc",
  uiConfig: {
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
};
