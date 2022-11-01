import upperFirst from "lodash/upperFirst";

import { render } from "src/mailing/util/mjml";
import { getPreviewComponent } from "src/mailing/util/previewTree";

type Params = { path: string[] };

const handler = async (req, res) => {
  const { path, ...templateProps } = req.query as Params;
  const [previewClass, previewFunction] = path || [];

  let preview: ReturnType<typeof render> | null = null;
  if (previewClass && previewFunction) {
    const component = await getPreviewComponent(upperFirst(previewClass), previewFunction, templateProps);
    if (!component) {
      res.json({ success: false, message: "component not found" })
      return
    }
    preview = render(component);
  }

  res.json({ success: true, preview })
};

export default handler
