import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { GetHelpCenterQueryInput } from "../../schema/schemas";
import { KnownError, rejectOnNotFound, resHandler } from "../../utils/response";

export const getHelpCenter = async (req: FastifyRequest, res: FastifyReply) => {
  const result = await prisma.helpCenter.findMany({
    where: { isActive: true },
  });

  resHandler(res, 200, "Success", result);
};

export const getHelpCenterQuery = async (
  req: FastifyRequest<{ Querystring: GetHelpCenterQueryInput }>,
  res: FastifyReply
) => {
  const result = await prisma.helpCenter.findFirst({
    where: { id: req.query.id, isActive: true },
    rejectOnNotFound: rejectOnNotFound(),
    include: { query: true },
  });

  resHandler(res, 200, "Success", result);
};
