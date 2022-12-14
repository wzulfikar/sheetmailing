import { z } from "zod"

export const Schema = z.object({
  user: z.string(),
  password: z.string(),
  host: z.string(),
  port: z.string().transform(v => parseInt(v))
})

/**
 * Turn 'pattie.leuschke83:xHBTZpzXUHtsrXtSTj@ethereal.email:587' into
 * {user: 'pattie.leuschke83', password: 'xHBTZpzXUHtsrXtSTj', host: ethereal.email, port: 587}
 */
export function parseSmtpInfo(str: string) {
  const splitHost = str.split('@')
  const hostInfo = splitHost.pop();
  const userInfo = splitHost.join('@');

  const [user, password] = userInfo.split(':')
  const [host, port = '587'] = hostInfo?.split(':') || []

  const smtp = { user, password, host, port };
  const schema = Schema.safeParse(smtp)
  if (schema.success) {
    return { smtp: schema.data, error: undefined }
  }
  return { error: schema.error }
}
