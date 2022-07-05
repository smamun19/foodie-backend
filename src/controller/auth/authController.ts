import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { sendEmail } from "../../utils/email";
import { generateOtp, verifyOtp } from "../../utils/otp";
import { comparePassword, hashPassword } from "../../utils/password";
import { KnownError, resHandler } from "../../utils/response";
import {
  CreateUserInput,
  LoginInput,
  OtpInput,
  ResetPassInput,
  ResetPassReqInput,
  VerifyOtpInput,
} from "../../schema/schemas";

export const signup = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  res: FastifyReply
) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: { name, roles: ["USER"], email, password: hashedPassword },
    });

    const otp = generateOtp(email);
    console.log(otp);

    //sendEmail(email, otp);
    return resHandler(res, 201, "Success");
  } catch (error: any) {
    if (error.meta.target[0] === "email") {
      return resHandler(res, 400, "This email is already registered.");
    }
    throw new Error(error);
  }
};

export const signin = async (
  req: FastifyRequest<{ Body: LoginInput }>,
  res: FastifyReply
) => {
  const { email: identity, password: pass } = req.body;

  const { createdAt, email, id, name, password, roles, updatedAt } =
    await prisma.user.findUnique({
      where: { email: identity },
      rejectOnNotFound: () => new KnownError(404, "User not found"),
    });

  const result = await comparePassword(pass, password);

  if (!result) {
    throw new KnownError(400, "Password do not match");
  }

  const token = await req.jwt.sign(
    { id, name, email, roles, createdAt, updatedAt },
    { expiresIn: "30d" }
  );

  return resHandler(res, 200, "Success", { token, name });
};

export const resetPassReq = async (
  req: FastifyRequest<{ Body: ResetPassReqInput }>,
  res: FastifyReply
) => {
  const { email } = req.body;

  await prisma.user.findUnique({
    where: { email },
    rejectOnNotFound: () =>
      new KnownError(404, "User not found. Please sign up first"),
  });

  const otp = generateOtp(email);
  console.log(otp);

  //sendEmail(email, otp);

  return resHandler(res, 200, "Success", otp);
};

export const resetPass = async (
  req: FastifyRequest<{ Body: ResetPassInput }>,
  res: FastifyReply
) => {
  const { email, newPassword } = req.body;

  await prisma.user.findUnique({
    where: { email },
    rejectOnNotFound: () =>
      new KnownError(404, "User not found. Please sign up first"),
  });

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
  return resHandler(res, 200, "Success");
};

export const sendOtp = async (
  req: FastifyRequest<{ Body: OtpInput }>,
  res: FastifyReply
) => {
  const { email } = req.body;
  const otp = generateOtp(email);

  console.log(otp);

  //sendEmail(email, otp);
  resHandler(res, 200, "Success");
};

export const verifyotp = async (
  req: FastifyRequest<{ Body: VerifyOtpInput }>,
  res: FastifyReply
) => {
  const { email, otp } = req.body;

  const result = verifyOtp(email, otp);

  resHandler(res, 200, "Success", result);
};
