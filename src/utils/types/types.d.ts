export enum Role {
  VENDOR,
  USER,
  PREMIUM,
  ADMIN,
  MODERATOR,
  BANNED,
}

export type Roles =
  | "VENDOR"
  | "USER"
  | "PREMIUM"
  | "ADMIN"
  | "MODERATOR"
  | "BANNED";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstance {
    auth: any;
  }
}
declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: string;
      name: string;
      email: string;
      roles: Roles[];
      updatedAt: string;
      createdAt: string;
      iat: string;
      exp: string;
    };
  }
}
