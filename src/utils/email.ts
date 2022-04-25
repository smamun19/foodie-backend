import { createTransport } from "nodemailer";

const { MAIL_USER, MAIL_PASS } = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  throw new Error("Credintials Missing");
}

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const sendEmail = async (rcvr: string, code: string) => {
  await transporter.sendMail({
    from: '"Foodie Support" <noreply@foodie_support.com>',
    to: rcvr,
    subject: "OTP",
    text: `Your Foodie OTP is ${code}. It expires after 10 minutes`,
    // html: "<b>your html body here</b>",
  });
};
