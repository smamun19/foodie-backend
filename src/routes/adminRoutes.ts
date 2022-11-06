import { FastifyInstance } from "fastify";
import {
  addHelpCenter,
  addHelpCenterQuery,
  addItem,
  addRestaurant,
  addVoucher,
  editHelpCenter,
  editHelpCenterQuery,
  editRestaurant,
  editVoucher,
  uploadRestaurantPhoto,
} from "../controller/admin/adminController";
import { $ref } from "../schema/schemas";
import { uploadPreHandler } from "../utils/handler";

// Admin security will be implemented later for convenience
const SchemaOpts = { tags: ["Admin"] };
const adminRoutes = async (router: FastifyInstance) => {
  router.post(
    "/voucher/add",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("createVoucherSchema"),
      },
    },
    addVoucher
  );

  router.post(
    "/voucher/edit",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("updateVoucherSchema"),
      },
    },
    editVoucher
  );

  router.post(
    "/helpCenter/add",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("addHelpCenterSchema"),
      },
    },
    addHelpCenter
  );

  router.post(
    "/helpCenter/edit",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("editHelpCenterSchema"),
      },
    },
    editHelpCenter
  );

  router.post(
    "/helpCenter/add-query",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("addHelpCenterQuerySchema"),
      },
    },
    addHelpCenterQuery
  );

  router.post(
    "/restaurant/add",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("addRestaurantSchema"),
      },
    },
    addRestaurant
  );

  router.post(
    "/restaurant/edit",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("editRestaurantSchema"),
      },
    },
    editRestaurant
  );

  router.post(
    "/restaurant/upload",
    {
      preValidation: uploadPreHandler,
      schema: {
        ...SchemaOpts,
        consumes: ["multipart/form-data"],

        body: {
          type: "object",
          required: ["id", "file"],
          properties: {
            id: {
              type: "string",
            },
            file: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    },
    uploadRestaurantPhoto
  );

  router.post(
    "/helpCenter/edit-query",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("editHelpCenterQuerySchema"),
      },
    },
    editHelpCenterQuery
  );

  router.post(
    "/restaurant/add-item",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("addItemSchema"),
      },
    },
    addItem
  );
};

export default adminRoutes;
