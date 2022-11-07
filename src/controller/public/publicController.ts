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
  // const result = await prisma.restaurant.findMany({
  //   where: { isActive: true },
  //   orderBy: { type: "asc" },
  // });

  interface Props {
    type: string;
    data: Record<any, any>[];
  }
  let data: Props[] = [];

  const result = await prisma.restaurant.groupBy({
    where: { isActive: true },
    by: ["type"],
    orderBy: { type: "asc" },
  });

  await Promise.all(
    result.map(async (e) => {
      const r = await prisma.restaurant.findMany({
        where: { type: e.type },
        include: { photo: true },
      });
      data.push({ type: e.type, data: r });
    })
  );

  data.sort((a, b) => {
    const nameA = a.type.toUpperCase();
    const nameB = b.type.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  resHandler(res, 200, "Success", data);
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
