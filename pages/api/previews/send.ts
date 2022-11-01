import type { NextApiRequest, NextApiResponse } from "next";
import { getPreviewComponent } from "src/mailing/util/previewTree";
import nodemailer from "nodemailer";
import { sendMailWithTransport } from "src/emails"

export default async function showPreviewsIndex(
  req: NextApiRequest,
  res: NextApiResponse<SendPreviewResponseBody>
) {
  if (req.method !== "POST" || !req.body) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const templateProps = req.query;
  const body: SendPreviewRequestBody = req.body;

  // Caller can provide html or preview references, html takes precedence.
  const { html, to, subject, previewClass, previewFunction, smtpInfo } = body;
  let component;
  if (!html && previewClass && previewFunction) {
    component = await getPreviewComponent(previewClass, previewFunction, templateProps);
  }

  if (!html && !component) {
    const error = "no html provided and no component found";
    console.error(`[ERROR] ${error}`);
    res.writeHead(400);
    res.end(JSON.stringify({ success: false, error }));
    return;
  }

  const { user, password, host, port } = smtpInfo
  const transport = nodemailer.createTransport({
    host, port,
    auth: { user, pass: password },
  });

  const sendMail = sendMailWithTransport(transport)
  await sendMail({
    html,
    component,
    to,
    dangerouslyForceDeliver: true,
    subject,
  });

  res.json({ success: true });
}
