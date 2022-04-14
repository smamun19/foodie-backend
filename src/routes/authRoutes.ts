import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/auth/authController";

import { $ref } from "../controller/user/userSchema";

const authRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { tags: ["Auth"] };
  router.post(
    "/signup",
    {
      schema: {
        ...SchemaOpts,

        body: $ref("createUserSchema"),
      },
      //   preValidation: [router.auth],
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

export default authRoutes;
