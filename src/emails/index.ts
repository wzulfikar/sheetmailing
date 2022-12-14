import { buildSendMail } from "mailing-core";
import upperFirst from "lodash/upperFirst";
import nodemailer from "nodemailer";

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

export const sendMailWithTransport = (transport) => buildSendMail({
  transport,
  defaultFrom: "test@sheetmailing.com",
  configPath: "./mailing.config.json",
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "test@sheetmailing.com",
  configPath: "./mailing.config.json",
});

export const getTemplateComponent = async (template: string) => {
  const component = await import(`./${upperFirst(template)}`).then(
    (mod) => mod.default
  )
  return component
}

type Options = {
  subject: string;
  template: string,
  templateProps: object
}
export const mailTo = async (recipient: string, options: Options) => {
  const { template, templateProps, ...sendMailArgs } = options
  const component = await getTemplateComponent(template)
  await sendMail({
    ...sendMailArgs,
    to: recipient,
    component: component(templateProps),
    dangerouslyForceDeliver: true,
  })
}

export default sendMail;
