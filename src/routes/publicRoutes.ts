import { FastifyInstance } from "fastify";

import {
  getAllRestaurants,
  getHelpCenter,
  getHelpCenterQuery,
  getItems,
  getRestaurant,
  getRestaurants,
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

  router.get(
    "/restaurants",
    {
      schema: {
        ...SchemaOpts,
      },
    },
    getRestaurants
  );

  router.get(
    "/all-restaurants",
    {
      schema: {
        ...SchemaOpts,
      },
    },
    getAllRestaurants
  );

  router.get(
    "/restaurant",
    {
      schema: {
        ...SchemaOpts,
        querystring: $ref("getByIdSchema"),
      },
    },
    getRestaurant
  );

  router.get(
    "/restaurant/items",
    {
      schema: {
        ...SchemaOpts,
        querystring: $ref("getByIdSchema"),
      },
    },
    getItems
  );
};

export default publicRoutes;
