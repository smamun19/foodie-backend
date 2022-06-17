import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";
import { FindVoucherInput } from "../auth/authSchema";

export const myinfo = async (req: FastifyRequest, res: FastifyReply) => {
  const user = req.user;
  return resHandler(res, 200, "Success", { user });
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
