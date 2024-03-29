import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, rejectOnNotFound, resHandler } from "../../utils/response";
import { comparePassword, hashPassword } from "../../utils/password";
import {
  ChangePassInput,
  EditUserInput,
  FindVoucherInput,
  AddAddressInput,
  EditAddressInput,
  RemoveAddressInput,
  GetGeoAddressInput,
  ByStringIdInput,
  CreateOrderInput,
  FindCurrentOrderInput,
} from "../../schema/schemas";
import { getGeoAddress } from "../../utils/geocoder";

export const myinfo = async (req: FastifyRequest, res: FastifyReply) => {
  const user = req.user;
  return resHandler(res, 200, "Success", { user });
};

export const userInfo = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, phone, name } = await prisma.user.findUnique({
    where: { id: req.user.id },
    rejectOnNotFound: () => new KnownError(404, "User not found"),
  });
  return resHandler(res, 200, "Success", { email, phone, name });
};

export const editInfo = async (
  req: FastifyRequest<{ Body: EditUserInput }>,
  res: FastifyReply
) => {
  console.log(req.body);
  const { email, phone, name, updatedAt } = await prisma.user.update({
    where: { id: req.user.id },
    data: req.body,
  });
  return resHandler(res, 200, "Success", { email, phone, name, updatedAt });
};

export const changePassword = async (
  req: FastifyRequest<{ Body: ChangePassInput }>,
  res: FastifyReply
) => {
  const { newPassword, currentPassword } = req.body;
  const { password } = await prisma.user.findUnique({
    where: { id: req.user.id },
    rejectOnNotFound: () => new KnownError(404, "User not found"),
  });
  const isMatched = await comparePassword(currentPassword, password);
  if (!isMatched) {
    return resHandler(res, 401, "Current password did not match");
  }
  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword },
  });
  return resHandler(res, 200, "Success");
};

export const addVoucher = async (
  req: FastifyRequest<{ Body: FindVoucherInput }>,
  res: FastifyReply
) => {
  const { name } = req.body;
  const result = await prisma.voucher.findFirst({
    where: { name: { equals: name, mode: "insensitive" }, isActive: true },
    rejectOnNotFound: () =>
      new KnownError(404, "Voucher not found. Please try again"),
  });
  return resHandler(res, 200, "Success", { ...result });
};

export const addAddress = async (
  req: FastifyRequest<{ Body: AddAddressInput }>,
  res: FastifyReply
) => {
  const { addresses } = await prisma.user.update({
    where: { id: req.user.id },
    include: { addresses: { orderBy: { updatedAt: "desc" } } },
    data: { addresses: { create: req.body } },
  });
  return resHandler(res, 201, "Success", addresses);
};

export const editAddress = async (
  req: FastifyRequest<{ Body: EditAddressInput }>,
  res: FastifyReply
) => {
  const {
    name,
    id,
    lat,
    long,
    deliveryInstructions,
    details,
    extDetails,
    label,
  } = req.body;
  const { addresses } = await prisma.user.update({
    where: { id: req.user.id },
    include: { addresses: { orderBy: { updatedAt: "desc" } } },
    data: {
      addresses: {
        update: {
          where: { id },
          data: {
            name,
            lat,
            long,
            deliveryInstructions,
            details,
            extDetails,
            label,
          },
        },
      },
    },
  });
  return resHandler(res, 200, "Success", addresses);
};

export const getAddresses = async (req: FastifyRequest, res: FastifyReply) => {
  const { addresses } = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { addresses: true },
    rejectOnNotFound: rejectOnNotFound(),
  });
  return resHandler(res, 200, "Success", addresses);
};

export const removeAddress = async (
  req: FastifyRequest<{ Body: RemoveAddressInput }>,
  res: FastifyReply
) => {
  const { addresses } = await prisma.user.update({
    where: { id: req.user.id },
    include: { addresses: true },
    data: { addresses: { delete: { id: req.body.id } } },
  });
  return resHandler(res, 200, "Success", addresses);
};

export const geoAddress = async (
  req: FastifyRequest<{ Body: GetGeoAddressInput }>,
  res: FastifyReply
) => {
  const { lat, lon } = req.body;
  const result = await getGeoAddress(lat, lon);

  return resHandler(res, 200, "Success", result);
};

export const createOrder = async (
  req: FastifyRequest<{ Body: CreateOrderInput }>,
  res: FastifyReply
) => {
  const { data, restaurantId, subTotalFee, totalFee, voucherId } = req.body;
  const { orders } = await prisma.user.update({
    where: { id: req.user.id },
    select: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    data: {
      orders: {
        create: {
          restaurantId,
          subTotalFee,
          totalFee,
          voucherId,
          items: {
            createMany: { data },
          },
        },
      },
    },
  });

  return resHandler(res, 201, "Success", orders[0]);
};

export const currentOrder = async (
  req: FastifyRequest<{ Querystring: ByStringIdInput }>,
  res: FastifyReply
) => {
  const order = await prisma.order.findUnique({
    where: { id: req.query.id },
    include: {
      restaurant: { select: { title: true } },
      voucher: { select: { name: true, value: true } },
      items: { include: { item: { select: { name: true } } } },
    },
    rejectOnNotFound: rejectOnNotFound(),
  });

  return resHandler(res, 200, "Success", order);
};

export const findCurrentOrder = async (
  req: FastifyRequest<{ Body: FindCurrentOrderInput }>,
  res: FastifyReply
) => {
  const order = await prisma.order.findFirst({
    where: {
      id: req.body.id,
      status: { notIn: ["Completed", "Cancelled", "Rejected"] },
    },
    include: {
      restaurant: { select: { title: true } },
    },
  });

  return resHandler(res, 200, "Success", order);
};
