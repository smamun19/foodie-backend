import { FastifyInstance } from "fastify";

import { test } from "../controller/userController";

const opts = { schema: { tags: ["Product"] } };

const productsRoutes = async (router: FastifyInstance) => {
  router.get("/", opts, test);
};

export default productsRoutes;
