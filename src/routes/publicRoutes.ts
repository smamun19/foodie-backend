import { FastifyInstance } from "fastify";

import {
  getHelpCenter,
  getHelpCenterQuery,
} from "../controller/public/publicController";
import { $ref } from "../schema/schemas";
const SchemaOpts = { tags: ["Public"] };
const publicRoutes = async (router: FastifyInstance) => {
  router.get(
    "/help-center",
    {
      schema: {
        ...SchemaOpts,
      },
    },
    getHelpCenter
  );

  router.post(
    "/help-center-query",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("getHelpCenterQuerySchema"),
      },
    },
    getHelpCenterQuery
  );
};

export default publicRoutes;
