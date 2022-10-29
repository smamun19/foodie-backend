import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";
import {
  CreateVoucherInput,
  UpdateVoucherInput,
  AddHelpCenterInput,
  AddHelpCenterQueryInput,
  EditHelpCenterInput,
  EditHelpCenterQueryInput,
  AddRestaurantInput,
  EditRestaurantInput,
} from "../../schema/schemas";

export const addVoucher = async (
  req: FastifyRequest<{ Body: CreateVoucherInput }>,
  res: FastifyReply
) => {
  const { details, isActive, name, value } = req.body;
  await prisma.voucher.create({
    data: { details, isActive, name: name?.toUpperCase(), value },
  });
  resHandler(res, 201, "Success");
};

export const editVoucher = async (
  req: FastifyRequest<{ Body: UpdateVoucherInput }>,
  res: FastifyReply
) => {
  const { id, details, isActive, name, value } = req.body;
  const r = await prisma.voucher.update({
    where: { id },
    data: { details, isActive, name: name?.toUpperCase(), value },
  });
  resHandler(res, 200, "Success", r);
};

export const addHelpCenter = async (
  req: FastifyRequest<{ Body: AddHelpCenterInput }>,
  res: FastifyReply
) => {
  const { title, icon } = req.body;
  const result = await prisma.helpCenter.create({
    data: { title, icon },
  });
  resHandler(res, 201, "Success", result);
};

export const editHelpCenter = async (
  req: FastifyRequest<{ Body: EditHelpCenterInput }>,
  res: FastifyReply
) => {
  const { title, icon, isActive, id } = req.body;
  const result = await prisma.helpCenter.update({
    where: { id },
    data: { title, icon, isActive },
  });
  resHandler(res, 200, "Success", result);
};

export const addHelpCenterQuery = async (
  req: FastifyRequest<{ Body: AddHelpCenterQueryInput }>,
  res: FastifyReply
) => {
  const result = await prisma.helpCenterQuery.create({
    data: req.body,
  });
  resHandler(res, 201, "Success", result);
};

export const editHelpCenterQuery = async (
  req: FastifyRequest<{ Body: EditHelpCenterQueryInput }>,
  res: FastifyReply
) => {
  const { title, icon, isActive, id } = req.body;
  const result = await prisma.helpCenterQuery.update({
    where: { id },
    data: { title, icon, isActive },
  });
  resHandler(res, 200, "Success", result);
};

export const addRestaurant = async (
  req: FastifyRequest<{ Body: AddRestaurantInput }>,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.create({
    data: req.body,
  });
  resHandler(res, 201, "Success", result);
};

export const editRestaurant = async (
  req: FastifyRequest<{ Body: EditRestaurantInput }>,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.update({
    where: { id: req.body.id },
    data: req.body,
  });
  resHandler(res, 200, "Success", result);
};
