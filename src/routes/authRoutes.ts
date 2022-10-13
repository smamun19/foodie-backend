import { FastifyInstance } from "fastify";

import {
  resetPass,
  resetPassReq,
  sendOtp,
  signin,
  signup,
  verifyotp,
} from "../controller/auth/authController";

import { $ref } from "../schema/schemas";

const SchemaOpts = { tags: ["Auth"] };

const authRoutes = async (router: FastifyInstance) => {
  router.post(
    "/signup",
    {
      schema: {
        ...SchemaOpts,

        body: $ref("createUserSchema"),
      },
      //   preValidation: [router.auth],
    },
    signup
  );

  router.post(
    "/signin",
    {
      schema: { ...SchemaOpts, body: $ref("loginSchema") },
    },
    signin
  );

  router.post(
    "/reset-req",
    {
      schema: { ...SchemaOpts, body: $ref("resetPassReqSchema") },
    },
    resetPassReq
  );

  router.post(
    "/reset",
    {
      schema: { ...SchemaOpts, body: $ref("resetPassSchema") },
    },
    resetPass
  );

  router.post(
    "/sendotp",
    {
      schema: { ...SchemaOpts, body: $ref("otpSchema") },
    },
    sendOtp
  );
  router.post(
    "/verifyotp",
    {
      schema: { ...SchemaOpts, body: $ref("verifyOtpSchema") },
    },
    verifyotp
  );
};

export default authRoutes;
