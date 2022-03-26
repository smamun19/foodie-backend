import { FastifyRequest, FastifyReply } from "fastify";

export const test = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    return res.send("test");
  } catch (error) {
    console.error(error);
  }
};
