import { FastifyInstance } from "fastify";

import { signup } from "../controller/user/userController";

const opts = { schema: { tags: ["Product"] } };

const productsRoutes = async (router: FastifyInstance) => {
  router.get("/", opts, signup);
};

export default productsRoutes;
