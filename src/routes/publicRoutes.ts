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

  router.get(
    "/help-center-query",
    {
      schema: {
        ...SchemaOpts,
        querystring: $ref("getHelpCenterQuerySchema"),
      },
    },
    getHelpCenterQuery
  );
};

export default publicRoutes;
