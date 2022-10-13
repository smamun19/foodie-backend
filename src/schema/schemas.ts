import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email({ message: "This is not a valid email address" }),
};

const createUserSchema = z.object({
  ...userCore,
  name: z.string().nonempty(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});

const loginSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});

const resetPassReqSchema = z.object({
  ...userCore,
});

const resetPassSchema = z.object({
  ...userCore,
  newPassword: z
    .string({
      required_error: "New password is required",
      invalid_type_error: "New password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});

const changePassSchema = z.object({
  currentPassword: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
  newPassword: z
    .string({
      required_error: "New password is required",
      invalid_type_error: "New password must be string",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});

const otpSchema = z.object({
  ...userCore,
});
const verifyOtpSchema = z.object({
  ...userCore,
  otp: z.string(),
});

const createVoucherSchema = z.object({
  name: z.string().nonempty(),
  value: z.number().nonnegative(),
  isActive: z.boolean().optional(),
  details: z.string().min(20).max(100).optional(),
});

const updateVoucherSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  value: z.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
  details: z.string().min(20).max(100).optional(),
});

const findVoucherSchema = z.object({
  name: z.string(),
});

const editUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

const addAddressSchema = z.object({
  name: z.string(),
  details: z.string(),
  extDetails: z.string().optional(),
  label: z.string().optional(),
  deliveryInstructions: z.string().optional(),
  lat: z.number(),
  long: z.number(),
});

const editAddressSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  details: z.string().optional(),
  extDetails: z.string().optional(),
  deliveryInstructions: z.string().optional(),
  label: z.string().optional(),
  lat: z.number(),
  long: z.number(),
});

const removeAddressSchema = z.object({
  id: z.number(),
});

const getGeoAddressSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

const addHelpCenterSchema = z.object({
  title: z.string(),
  icon: z.string().optional(),
});

const addHelpCenterQuerySchema = z.object({
  title: z.string(),
  icon: z.string().optional(),
  helpCenterId: z.number(),
});

const editHelpCenterSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().optional(),
});

const editHelpCenterQuerySchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().optional(),
});

const getHelpCenterQuerySchema = z.object({
  id: z.number(),
});

export type CreateVoucherInput = z.infer<typeof createVoucherSchema>;
export type UpdateVoucherInput = z.infer<typeof updateVoucherSchema>;
export type FindVoucherInput = z.infer<typeof findVoucherSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPassReqInput = z.infer<typeof resetPassReqSchema>;
export type ResetPassInput = z.infer<typeof resetPassSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type EditUserInput = z.infer<typeof editUserSchema>;
export type ChangePassInput = z.infer<typeof changePassSchema>;
export type AddAddressInput = z.infer<typeof addAddressSchema>;
export type EditAddressInput = z.infer<typeof editAddressSchema>;
export type RemoveAddressInput = z.infer<typeof removeAddressSchema>;
export type GetGeoAddressInput = z.infer<typeof getGeoAddressSchema>;
export type AddHelpCenterInput = z.infer<typeof addHelpCenterSchema>;
export type AddHelpCenterQueryInput = z.infer<typeof addHelpCenterQuerySchema>;
export type EditHelpCenterInput = z.infer<typeof editHelpCenterSchema>;
export type EditHelpCenterQueryInput = z.infer<
  typeof editHelpCenterQuerySchema
>;
export type GetHelpCenterQueryInput = z.infer<typeof getHelpCenterQuerySchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  loginSchema,
  resetPassReqSchema,
  resetPassSchema,
  otpSchema,
  verifyOtpSchema,
  createVoucherSchema,
  updateVoucherSchema,
  findVoucherSchema,
  editUserSchema,
  changePassSchema,
  addAddressSchema,
  editAddressSchema,
  removeAddressSchema,
  getGeoAddressSchema,
  addHelpCenterSchema,
  editHelpCenterSchema,
  addHelpCenterQuerySchema,
  editHelpCenterQuerySchema,
  getHelpCenterQuerySchema,
});
