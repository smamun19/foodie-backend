import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/user/userController";

import { $ref } from "../controller/user/userSchema";

const opts = { schema: { tags: ["User"] } };

const userRoutes = async (router: FastifyInstance) => {
  router.post(
    "/signup",
    { schema: { tags: ["User"], body: $ref("createUserSchema") } },
    signup
  );

  router.post(
    "/signin",
    { schema: { tags: ["User"], body: $ref("loginSchema") } },
    signin
  );
};

export default userRoutes;
