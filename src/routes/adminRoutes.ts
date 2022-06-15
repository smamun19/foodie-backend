import { FastifyInstance } from "fastify";
import { addVoucher, editVoucher } from "../controller/admin/adminController";

import { $ref } from "../controller/auth/authSchema";

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
};

export default adminRoutes;
