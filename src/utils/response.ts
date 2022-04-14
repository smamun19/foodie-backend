import { FastifyReply } from "fastify";
import { ServerResponse } from "http";
import HttpStatusCode from "./HttpStatusCode";

export class KnownError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "KnownError";
  }
}

export const resHandler = (
  res: FastifyReply,
  statusCode: HttpStatusCode,
  message: string,
  details: any = undefined
) => {
  return res.status(statusCode).send({ message, statusCode, details });
};
