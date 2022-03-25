import { FastifyInstance } from "fastify";

import { test } from "../controller/userController";

const opts = { schema: { tags: ["User"] } };

const userRoutes = async (router: FastifyInstance) => {
  router.get("/", opts, test);
};

export default userRoutes;
