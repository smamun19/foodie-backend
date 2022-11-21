import { FastifyInstance } from "fastify";
import { $ref } from "../schema/schemas";

import {
  addVoucher,
  myinfo,
  changePassword,
  editInfo,
  userInfo,
  addAddress,
  editAddress,
  getAddresses,
  removeAddress,
  geoAddress,
  currentOrder,
  createOrder,
  findCurrentOrder,
} from "../controller/user/userController";

const SchemaOpts = { tags: ["User"], security: [{ jwt: [] }] };
const userRoutes = async (router: FastifyInstance) => {
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

  router.post(
    "/add-address",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("addAddressSchema"),
      },
      preValidation: [router.auth],
    },
    addAddress
  );

  router.post(
    "/edit-address",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("editAddressSchema"),
      },
      preValidation: [router.auth],
    },
    editAddress
  );

  router.post(
    "/remove-address",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("removeAddressSchema"),
      },
      preValidation: [router.auth],
    },
    removeAddress
  );

  router.post(
    "/get-geo-address",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("getGeoAddressSchema"),
      },
      preValidation: [router.auth],
    },
    geoAddress
  );

  router.get(
    "/myaddresses",
    {
      schema: {
        ...SchemaOpts,
      },
      preValidation: [router.auth],
    },
    getAddresses
  );

  router.post(
    "/order-item",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("createOrderSchema"),
      },
      preValidation: [router.auth],
    },
    createOrder
  );

  router.get(
    "/current-order",
    {
      schema: {
        ...SchemaOpts,
      },
      preValidation: [router.auth],
    },
    currentOrder
  );

  router.post(
    "/find-current-order",
    {
      schema: {
        ...SchemaOpts,
        body: $ref("findCurrentOrderSchema"),
      },
      preValidation: [router.auth],
    },
    findCurrentOrder
  );
};

export default userRoutes;
