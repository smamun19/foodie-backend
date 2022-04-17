import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/auth/authController";

const opts = { schema: { tags: ["Product"] } };

const productsRoutes = async (router: FastifyInstance) => {
  router.get("/", opts, signup);
};

export default productsRoutes;
