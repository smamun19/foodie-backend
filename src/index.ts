import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";

import productsRoutes from "./routes/porductRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import { userSchemas } from "./schema/schemas";
import { defaultErrorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";
import { jwtDecorate } from "./utils/auth";
import { swaggerObj, swaggerUiObject } from "./utils/swagger";
import publicRoutes from "./routes/publicRoutes";

const app = fastify({ logger: true });

const port = parseInt(process.env.PORT ?? "8080", 10);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "ohno!",
});
app.register(fastifyMultipart);
app.decorate("auth", jwtDecorate);
app.addHook("preValidation", (req, res, done) => {
  req.jwt = app.jwt;
  return done();
});

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}
app.register(fastifySwagger, swaggerObj);
app.register(fastifySwaggerUi, swaggerUiObject);

app.register(authRoutes, { prefix: "/api/auth" });
app.register(publicRoutes, { prefix: "/api/public" });
app.register(userRoutes, { prefix: "/api/user" });
app.register(adminRoutes, { prefix: "/api/admin" });
app.register(productsRoutes, { prefix: "/api/products" });
app.register(notFoundHandler);
app.setErrorHandler(defaultErrorHandler);

const start = (async () => {
  try {
    await app.listen({ port, ipv6Only: false });
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger doc at at http://localhost:${port}/api/doc`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
