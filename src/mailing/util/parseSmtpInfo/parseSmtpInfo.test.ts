import { parseSmtpInfo } from "src/mailing/util/parseSmtpInfo"

describe('parseSmtpInfo', () => {
  it('for ethereal.mail', () => {
    const { smtp, error } = parseSmtpInfo('pattie.leuschke83:xHBTZpzXUHtsrXtSTj@ethereal.email:587')
    expect(error).toBeUndefined()
    expect(smtp).toEqual({
      user: 'pattie.leuschke83',
      password: 'xHBTZpzXUHtsrXtSTj',
      host: 'ethereal.email',
      port: 587
    })
  });

  it('for mailgun', () => {
    const { smtp, error } = parseSmtpInfo('user@domain.com:password@smtp.mailgun.org')
    expect(error).toBeUndefined()
    expect(smtp).toEqual({
      user: 'user@domain.com',
      password: 'password',
      host: 'smtp.mailgun.org',
      port: 587
    })
  });
})
