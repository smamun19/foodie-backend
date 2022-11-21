import { FastifyInstance } from "fastify";

import {
  getAllRestaurants,
  getHelpCenter,
  getHelpCenterQuery,
  getItem,
  getItems,
  getRestaurant,
  getRestaurants,
  //test,
} from "../controller/public/publicController";
import { $ref } from "../schema/schemas";
const SchemaOpts = { tags: ["Public"] };
const publicRoutes = async (router: FastifyInstance) => {
  // router.get(
  //   "/test",
  //   {
  //     schema: {
  //       ...SchemaOpts,
  //     },
  //   },
  //   test
  // );

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
        querystring: $ref("getByStringIdSchema"),
      },
    },
    getRestaurant
  );

  router.get(
    "/restaurant/items",
    {
      schema: {
        ...SchemaOpts,
        querystring: $ref("getByStringIdSchema"),
      },
    },
    getItems
  );

  router.get(
    "/restaurant/item",
    {
      schema: {
        ...SchemaOpts,
        querystring: $ref("getByNumIdSchema"),
      },
    },
    getItem
  );
};

export default publicRoutes;
