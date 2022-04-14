import { FastifyReply, FastifyRequest } from "fastify";
import { KnownError } from "./response";

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

    const decoded = await req.jwt.verify(token);
    if (!decoded.roles) {
      throw new KnownError(400, "JWT does not contain any scope.");
    }
    req.user = decoded;
    console.log(typeof decoded);
    console.log(req.user);
  } catch (err) {
    res.send(err);
  }
};
