import { z } from "zod";
import { ApiHandler, handle } from "src/lib/backend"
import { mailTo } from "src/emails";

const schema = z.object({
  query: z.object({
    subject: z.string(),
    recipient: z.string(),
    recipient_name: z.string().optional(),
    template: z.string(),
  })
})

const handler: ApiHandler<typeof schema> = async (req, res) => {
  const { subject, recipient, recipient_name, template, ...templateProps } = req.query as z.infer<typeof schema>['query']
  await mailTo(recipient, { subject, template, templateProps })
  res.json({ success: true, message: "email sent" })
}

export default handle(handler, { schema })
