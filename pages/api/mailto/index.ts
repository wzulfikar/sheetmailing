import { z } from "zod";
import { ApiHandler, handle } from "src/lib/backend"
import { mailTo } from "src/emails";
import { Schema as SmtpSchema } from "src/mailing/util/parseSmtpInfo"

const schema = z.object({
  body: z.object({
    subject: z.string(),
    recipient: z.string(),
    recipient_name: z.string().optional(),
    template: z.string(),
    smtpInfo: SmtpSchema
  })
})

const handler: ApiHandler<typeof schema> = async (req, res) => {
  const { subject, recipient, recipient_name, template, smtpInfo, ...templateProps } = req.query as z.infer<typeof schema>['body']
  await mailTo(recipient, { subject, template, templateProps })
  res.json({ success: true, message: "email sent" })
}

export default handle(handler, { schema })
