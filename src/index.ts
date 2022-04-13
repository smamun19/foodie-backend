import fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import userRoutes from "./routes/userRoutes";
import fastifyJwt, { JWT } from "fastify-jwt";
import productsRoutes from "./routes/porductRoutes";
import { userSchemas } from "./controller/user/userSchema";
import { defaultErrorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";
import { jwtDecorate, jwtHook } from "./utils/auth";
import { swaggerObj } from "./utils/swagger";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    auth: any;
  }
}

const app = fastify({ logger: true });

export const port = parseInt(process.env.PORT ?? "8080", 10);

app.register(fastifyJwt, { secret: process.env.JWT_SECRET ?? "ohno!" });
app.decorate("auth", jwtDecorate);
app.addHook("preValidation", jwtHook);

for (const schema of [...userSchemas]) {
  app.addSchema(schema);
}

app.register(fastifySwagger, swaggerObj);

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
