import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  name: z.string(),
};

const createUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  name: z.string(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be string",
  }),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});

const resetPassReqSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
});

const resetPassSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  otp: z.number({
    required_error: "Otp is required",
    invalid_type_error: "Otp must be number",
  }),
  newPassword: z.string({
    required_error: "New password is required",
    invalid_type_error: "New password must be string",
  }),
});

const otpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
});
const verifyOtpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  otp: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPassReqInput = z.infer<typeof resetPassReqSchema>;
export type ResetPassInput = z.infer<typeof resetPassSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  loginSchema,
  resetPassReqSchema,
  resetPassSchema,
  otpSchema,
  verifyOtpSchema,
});
