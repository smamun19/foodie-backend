import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const notFoundHandler = (
  instance: FastifyInstance,
  _option: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  instance.setNotFoundHandler((req, res) => {
    res.status(404).send({
      message: "route not found",
      statusCode: 404,
      details: {
        path: req.url,
        method: req.method,
      },
    });
  });
  done();
};
