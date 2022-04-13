import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const jwtDecorate = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    res.send(err);
  }
};
export const jwtHook = (
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  try {
    // req.jwtVerify();
    console.log("req.jwt");
    next();
  } catch (err) {
    res.send(err);
  }
};
