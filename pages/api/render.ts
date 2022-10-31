import type { NextApiRequest, NextApiResponse } from "next";
import { MjmlError } from "mjml-react";

import React from "react";
import upperFirst from "lodash/upperFirst";
import { render } from "mailing-core";

import { getTemplateComponent } from "src/emails";

type Data = {
  error?: string; // api error messages
  html?: string;
  mjmlErrors?: MjmlError[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { templateName, props } = "GET" === req.method ? req.query : req.body;

  // validate template name
  if (typeof templateName !== "string") {
    return res.status(403).json({ error: "templateName must be specified" });
  }

  // parse props
  let parsedProps = {};
  try {
    parsedProps =
      "GET" === req.method
        ? JSON.parse(decodeURIComponent(props as string))
        : props;
  } catch {
    return res
      .status(403)
      .json({ error: "props could not be parsed from querystring" });
  }

  const { error, mjmlErrors, html } = renderTemplate(
    templateName.replace(/\.[jt]sx?$/, ""),
    parsedProps
  );

  if (error) {
    return res.status(404).json({ error });
  }
  res.status(200).json({ html, mjmlErrors });
}
