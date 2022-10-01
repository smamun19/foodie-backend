import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";
import { comparePassword, hashPassword } from "../../utils/password";
import {
  ChangePassInput,
  EditUserInput,
  FindVoucherInput,
} from "../../schema/schemas";

export const myinfo = async (req: FastifyRequest, res: FastifyReply) => {
  const user = req.user;
  return resHandler(res, 200, "Success", { user });
};

export const userInfo = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, mobile, name } = await prisma.user.findUnique({
    where: { id: req.user.id },
    rejectOnNotFound: () => new KnownError(404, "User not found"),
  });
  return resHandler(res, 200, "Success", { email, mobile, name });
};

export const editInfo = async (
  req: FastifyRequest<{ Body: EditUserInput }>,
  res: FastifyReply
) => {
  const { email, mobile, name } = req.body;
  await prisma.user.update({
    where: { id: req.user.id },
    data: { name, email, mobile },
  });
  return resHandler(res, 200, "Success");
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
