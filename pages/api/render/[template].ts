import type { NextApiRequest, NextApiResponse } from "next";
import { renderTemplate } from "src/emails";
import upperFirst from "lodash/upperFirst";

type Data = {
  error?: string; // api error messages
  html?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { template, ...props } = req.query as { [key: string]: string };
  const html = await renderTemplate(upperFirst(template), props);
  res.status(200).json({ html });
}
