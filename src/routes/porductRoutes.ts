import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/auth/authController";

const productsRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { schema: { tags: ["Product"] } };
  router.get("/", SchemaOpts, signup);
};

export default productsRoutes;
