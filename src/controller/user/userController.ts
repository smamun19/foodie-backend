import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";
import { CreateUserInput, LoginInput } from "../user/userSchema";

export const myinfo = async (req: FastifyRequest, res: FastifyReply) => {
  const user = req.user;
  return resHandler(res, 200, "Success", { user });
};
