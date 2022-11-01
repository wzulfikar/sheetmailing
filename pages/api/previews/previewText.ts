import { flatten } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "src/mailing/util/mjml";
import { JSDOM, VirtualConsole } from "jsdom";
import { getPreviewComponent, previewTree } from "src/mailing/util/previewTree";

export type PreviewIndexResponseBody = {
  previews: [string, string[]][];
  previewText: {
    [path: string]: string;
  };
};

const noopConsole = new VirtualConsole();
noopConsole.on("error", (data) => {
  // No-op to skip console errors.
  console.debug(data?.toString());
});

const MAX_TEXT_CHARS = 140;

async function getPreviewFunction(
  previewClass: string,
  name: string,
  templateProps?: object
): Promise<[string, string]> {
  let text = "";
  try {
    const component = await getPreviewComponent(previewClass, name, templateProps);
    if (!component) throw new Error(`${previewClass}#${name} not found`);
    const { html } = render(component);
    // slice out the body to minimize funky head parsing
    const body = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(html);
    if (body && body[1]) {
      // let jsdom figure out what the text content is
      const dom = new JSDOM(body[1], { virtualConsole: noopConsole });
      text =
        dom.window.document.body.textContent
          ?.replace(/\s+/g, " ")
          .trim()
          .substring(0, MAX_TEXT_CHARS) || "";
    }
  } catch (e) {
    console.error(`[ERROR] error rendering text preview for ${previewClass}#${name}`, e);
  }
  return [`/previews/${previewClass}/${name}`, text];
}

export default async function showPreviewsIndex(
  req: NextApiRequest,
  res: NextApiResponse<PreviewIndexResponseBody>
) {
  const templateProps = req.query
  const previews = await previewTree();
  const previewsMap = await Promise.all(previews.map(async (previewGroup) =>
    await Promise.all(previewGroup[1].map(async (pf) => await getPreviewFunction(previewGroup[0], pf, templateProps)))
  ))
  const previewText = Object.fromEntries(flatten(previewsMap));
  res.json({ previews, previewText });
}
