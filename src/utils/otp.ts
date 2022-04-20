import crypto from "crypto";
import { totp } from "otplib";
const { OTP_SECRET } = process.env;

if (!OTP_SECRET) {
  throw new Error("Credintials Missing");
}

const totpOptions = {
  step: 67,
  window: 3,
};

totp.options = totpOptions;

export const generateOtp = (input: string) => {
  const secret = crypto
    .createHmac("sha256", OTP_SECRET)
    .update(input)
    .digest("hex");

  return totp.generate(secret);
};

export const verifyOtp = (input: string, otp: string) => {
  const secret = crypto
    .createHmac("sha256", OTP_SECRET)
    .update(input)
    .digest("hex");

  return totp.check(otp, secret);
};
