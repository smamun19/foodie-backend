import fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import authRoutes from "./routes/authRoutes";
import fastifyJwt from "fastify-jwt";
import productsRoutes from "./routes/porductRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { userSchemas } from "./controller/auth/authSchema";

import { defaultErrorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";
import { jwtDecorate } from "./utils/auth";
import { swaggerObj } from "./utils/swagger";

const app = fastify({ logger: true });

const port = parseInt(process.env.PORT ?? "8080", 10);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "ohno!",
});
app.decorate("auth", jwtDecorate);
app.addHook("preValidation", (req, res, done) => {
  req.jwt = app.jwt;
  return done();
});

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}
app.register(fastifySwagger, swaggerObj);

app.register(authRoutes, { prefix: "/api/auth" });
app.register(userRoutes, { prefix: "/api/user" });
app.register(adminRoutes, { prefix: "/api/admin" });
app.register(productsRoutes, { prefix: "/api/products" });
app.register(notFoundHandler);
app.setErrorHandler(defaultErrorHandler);

const start = (async () => {
  try {
    await app.listen(port, "::");
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger doc at at http://localhost:${port}/api/doc`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
