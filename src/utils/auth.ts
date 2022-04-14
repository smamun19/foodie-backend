import { FastifyReply, FastifyRequest } from "fastify";
import { VerifyPayloadType } from "fastify-jwt";
import { KnownError } from "./response";
import { Roles } from "./types/types";

type CustomVerifyPayoadType = {
  id: string;
  name: string;
  email: string;
  roles: Roles[];
  updatedAt: string;
  createdAt: string;
  iat: string;
  exp: string;
} & VerifyPayloadType;

export const jwtDecorate = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new KnownError(400, "No token provided");
    }

    if (!authToken.includes("Bearer ")) {
      throw new KnownError(400, "Bearer Token Not Found");
    }

    const token = authToken?.replace("Bearer ", "");

    const decoded: CustomVerifyPayoadType = await req.jwt.verify(token);
    if (!decoded.roles) {
      throw new KnownError(400, "JWT does not contain any scope.");
    }
    req.user = decoded;
  } catch (err) {
    res.send(err);
  }
};
