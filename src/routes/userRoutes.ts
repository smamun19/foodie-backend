import { FastifyInstance } from "fastify";
import { $ref } from "../controller/auth/authSchema";

import { addVoucher, myinfo } from "../controller/user/userController";

const userRoutes = async (router: FastifyInstance) => {
  const SchemaOpts = { tags: ["User"], security: [{ jwt: [] }] };
  router.get(
    "/myinfo",
    {
      schema: {
        ...SchemaOpts,
      },
      preValidation: [router.auth],
    },
    myinfo
  );

  router.post(
    "/addvoucher",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("findVoucherSchema"),
      },
      preValidation: [router.auth],
    },
    addVoucher
  );
};

export default userRoutes;
