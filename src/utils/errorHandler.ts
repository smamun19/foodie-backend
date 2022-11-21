import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const defaultErrorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) => {
  const { validation } = err;
  if (validation) {
    res.status(400).send({
      statusCode: 400,
      message: `${validation[0].instancePath.slice(1)} ${
        validation[0].message
      }`,
    });
    return;
  }
  res.status(err.statusCode ?? 500).send({
    statusCode: err.statusCode ?? 500,
    message: err.message,
  });
  return;
};
