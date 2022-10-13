import { FastifyInstance } from "fastify";
import {
  addHelpCenter,
  addHelpCenterQuery,
  addVoucher,
  editHelpCenter,
  editHelpCenterQuery,
  editVoucher,
} from "../controller/admin/adminController";
import { $ref } from "../schema/schemas";

// Admin security will be implemented later for convenience
const adminRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { tags: ["Admin"] };

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
