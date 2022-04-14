import { FastifyInstance } from "fastify";

import { myinfo } from "../controller/user/userController";

import { $ref } from "../controller/user/userSchema";

const userRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { tags: ["User"], security: [{ jwt: [] }] };
  router.get(
    "/myinfo",
    {
      schema: {
        ...SchemaOpts,
      },
      preValidation: [router.auth],
    },
    myinfo
  );
};

export default userRoutes;
