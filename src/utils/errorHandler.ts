import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const defaultErrorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) => {
  res.status(err.statusCode ?? 500).send({
    statusCode: err.statusCode ?? 500,
    message: err.message,
  });
};
