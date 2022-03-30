import { FastifyRequest, FastifyReply } from "fastify";
import { appendFile } from "fs";
import prisma from "../../db/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import { KnownError } from "../../utils/response";
import { CreateUserInput, LoginInput } from "./userSchema";

export const signup = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  res: FastifyReply
) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return res.send({ status: "ok" });
  } catch (error) {
    throw new KnownError(500, "Internal Server Error");
  }
};

export const signin = async (
  req: FastifyRequest<{ Body: LoginInput }>,
  res: FastifyReply
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      rejectOnNotFound: () => new KnownError(404, "User not found"),
    });

    const result = await comparePassword(password, user.password);

    if (!result) {
      return new KnownError(400, "Password do not match");
    }

    return res.send({ status: "ok" });
  } catch (error) {
    throw new KnownError(400, "Failed");
  }
};
