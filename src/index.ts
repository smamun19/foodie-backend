import fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import userRoutes from "./routes/userRoutes";
import { version } from "../package.json";
import productsRoutes from "./routes/porductRoutes";
import { userSchemas } from "./controller/user/userSchema";
import { defaultErrorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";

const app = fastify({ logger: true });

const port = parseInt(process.env.PORT ?? "8080", 10);

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}

app.register(fastifySwagger, {
  routePrefix: "/api/doc",
  prefix: "/api",
  exposeRoute: true,
  staticCSP: true,

  openapi: {
    info: {
      title: "Foodie API",
      description: "API for Foodie",
      version,
    },
  },
});

app.register(userRoutes, { prefix: "/api/user" });
app.register(productsRoutes, { prefix: "/api/products" });
app.register(notFoundHandler);
app.setErrorHandler(defaultErrorHandler);

const start = (async () => {
  try {
    await app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger doc at at http://localhost:${port}/api/doc`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
