import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/user/userController";

import { $ref } from "../controller/user/userSchema";

const userRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { tags: ["Users"], security: [{ jwt: ["USER"] }] };
  router.post(
    "/signup",
    {
      schema: {
        ...SchemaOpts,

        body: $ref("createUserSchema"),
      },
      preValidation: [router.auth],
    },
    signup
  );

  router.post(
    "/signin",
    {
      schema: { ...SchemaOpts, body: $ref("loginSchema") },
    },
    signin
  );
};

export default userRoutes;
