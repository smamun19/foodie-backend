import { FastifyRequest } from "fastify";
import { UploadPhotoType } from "../schema/schemas";

interface File {
  filename: string;
  mimetype: string;
  encoding: string;
  decoded: string;
}

export const uploadPreHandler = async (
  request: FastifyRequest<{ Body: { file: File; id: string } }>
) => {
  const { filename, mimetype, encoding, decoded } = request.body.file;
  request.body = {
    ...request.body,
    // @ts-ignore
    file: decoded,
    filename,
    mimetype,
    encoding,
  };
};
