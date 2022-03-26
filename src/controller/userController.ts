import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../db/prisma";

export const test = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await prisma.user.create({
      data: { email: "asff@sfkajsf.com", name: "mamun", password: "randomone" },
    });
    const users = await prisma.user.findMany();
    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.send("ERROR");
  }
};
