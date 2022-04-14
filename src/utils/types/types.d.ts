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
