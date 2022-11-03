import { FastifyRequest } from "fastify";

export const uploadPreHandler = async (request: FastifyRequest) => {
  const { filename, mimetype, encoding, decoded } = request.body.file;
  request.body = {
    ...request.body,
    file: decoded,
    filename,
    mimetype,
    encoding,
  };
};
