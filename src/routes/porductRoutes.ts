import { FastifyInstance } from "fastify";

import { signin, signup } from "../controller/auth/authController";

const SchemaOpts = { schema: { tags: ["Product"] } };
const productsRoutes = async (router: FastifyInstance) => {
  router.get("/", SchemaOpts, signup);
};

export default productsRoutes;
