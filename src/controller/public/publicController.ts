import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { ByIdInput, GetHelpCenterQueryInput } from "../../schema/schemas";
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

export const getRestaurants = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.groupBy({
    where: { isActive: true },
    by: ["type"],
    orderBy: { type: "asc" },
  });

  const data = await Promise.all(
    result.map((e) =>
      prisma.restaurant.findMany({
        where: { type: e.type },
        include: { photo: true },
      })
    )
  );

  const final = result.map((e, i) => ({ type: e.type, data: data[i] }));

  resHandler(res, 200, "Success", final);
};

export const getAllRestaurants = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.findMany({
    where: { isActive: true },

    include: { photo: true },
  });

  resHandler(res, 200, "Success", result);
};

export const getItems = async (
  req: FastifyRequest<{ Querystring: ByIdInput }>,
  res: FastifyReply
) => {
  const { item } = await prisma.restaurant.findFirst({
    where: { id: req.query.id, isActive: true },

    include: { item: true },
    rejectOnNotFound: rejectOnNotFound(),
  });

  resHandler(res, 200, "Success", item);
};
