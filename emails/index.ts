import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  pool: true,
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT),
  secure: process.env.MAILER_SECURE == "true", // use TLS
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "replace@me.with.your.com",
  configPath: "./mailing.config.json",
});

export default sendMail;
