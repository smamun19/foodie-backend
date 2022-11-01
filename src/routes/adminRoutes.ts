import { FastifyInstance } from "fastify";
import {
  addHelpCenter,
  addHelpCenterQuery,
  addRestaurant,
  addVoucher,
  editHelpCenter,
  editHelpCenterQuery,
  editRestaurant,
  editVoucher,
  upload,
} from "../controller/admin/adminController";
import { $ref } from "../schema/schemas";

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
      schema: {
        ...SchemaOpts,
        consumes: ["multipart/form-data"],

        // body: {
        //   type: "object",
        //   properties: {
        //     id: {
        //       type: "string",
        //     },
        //     fieldname: { type: "string" },
        //     encoding: { type: "string" },
        //     filename: { type: "string" },
        //     mimetype: { type: "string" },
        //     file: {
        //       type: "string",
        //       format: "binary",
        //     },
        //   },
        // },
      },
    },
    upload
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
};

export default adminRoutes;
