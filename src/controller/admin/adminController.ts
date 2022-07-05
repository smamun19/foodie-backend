import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";
import { CreateVoucherInput, UpdateVoucherInput } from "../../schema/schemas";

export const addVoucher = async (
  req: FastifyRequest<{ Body: CreateVoucherInput }>,
  res: FastifyReply
) => {
  const { details, isActive, name, value } = req.body;
  await prisma.voucher.create({
    data: { details, isActive, name: name?.toUpperCase(), value },
  });
  resHandler(res, 200, "Success");
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
