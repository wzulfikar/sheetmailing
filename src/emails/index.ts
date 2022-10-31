import React from "react";
import { buildSendMail, render } from "mailing-core";
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

const sendMail = buildSendMail({
  transport,
  defaultFrom: "replace@me.with.your.com",
  configPath: "./mailing.config.json",
});

export const getTemplateComponent = async (template: string) => {
  const component = await import(`./${template}`).then(
    (mod) => mod.default
  )
  return component
}

export const renderTemplate = async (template: string, props: object) => {
  const component = await getTemplateComponent(template);
  const { html } = render(React.createElement(component, props));
  return html
}

type Options = {
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
  })
}

export default sendMail;
