import fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import authRoutes from "./routes/authRoutes";
import fastifyJwt, { JWT } from "fastify-jwt";
import productsRoutes from "./routes/porductRoutes";
import userRoutes from "./routes/userRoutes";
import { userSchemas } from "./controller/user/userSchema";
import { defaultErrorHandler } from "./utils/errorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";
import { jwtDecorate } from "./utils/auth";
import { swaggerObj } from "./utils/swagger";
import { Role, Roles } from "./utils/types/types";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstance {
    auth: any;
  }
}
declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: string;
      name: string;
      email: string;
      roles: Roles[];
      updatedAt: string;
      createdAt: string;
      iat: string;
      exp: string;
    };
  }
}

const app = fastify({ logger: false });

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
