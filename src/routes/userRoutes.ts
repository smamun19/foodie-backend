import { FastifyInstance } from "fastify";
import { $ref } from "../schema/schemas";

import {
  addVoucher,
  myinfo,
  changePassword,
  editInfo,
  userInfo,
} from "../controller/user/userController";

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

  router.get(
    "/userinfo",
    {
      schema: {
        ...SchemaOpts,
      },
      preValidation: [router.auth],
    },
    userInfo
  );

  router.post(
    "/editinfo",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("editUserSchema"),
      },
      preValidation: [router.auth],
    },
    editInfo
  );

  router.post(
    "/change-password",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("changePassSchema"),
      },
      preValidation: [router.auth],
    },
    changePassword
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
