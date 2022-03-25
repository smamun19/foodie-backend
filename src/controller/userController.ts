import { FastifyRequest, FastifyReply } from "fastify";
import deepkit from "../db/deepkit";
import { User } from "../db/deepkit";

export const test = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await deepkit.persist(new User("mamun"));
    const allUsers = await deepkit.query(User).find();

    return res.send(allUsers);
  } catch (error) {
    console.error(error);
  }
};
