import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../db/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import { KnownError, resHandler } from "../../utils/response";
import { CreateUserInput, LoginInput } from "../user/userSchema";

export const signup = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  res: FastifyReply
) => {
  const { email, name, password } = req.body;
  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: { name, roles: ["USER"], email, password: hashedPassword },
  });
  return resHandler(res, 201, "Success");
  //    catch (error) {
  //     throw new KnownError(500, "Internal Server Error");
  //   }
};

export const signin = async (
  req: FastifyRequest<{ Body: LoginInput }>,
  res: FastifyReply
) => {
  const { email: identity, password: pass } = req.body;

  const { createdAt, email, id, name, password, roles, updatedAt } =
    await prisma.user.findUnique({
      where: { email: identity },
      rejectOnNotFound: () => new KnownError(404, "User not found"),
    });

  const result = await comparePassword(pass, password);

  if (!result) {
    return new KnownError(400, "Password do not match");
  }

  const token = await req.jwt.sign(
    { id, name, email, roles, createdAt, updatedAt },
    { expiresIn: "30d" }
  );

  return resHandler(res, 201, "Success", { token });
  //   } catch (error) {
  //     throw new KnownError(400, "Failed");
  //   }
};
