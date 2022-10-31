import { MjmlHtml } from "mjml-react/extensions";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

import defaultPlaceholders from "./placeholders";

// eslint-disable-next-line react/display-name
export const createTextRenderer = (placeholders) => (text: string) => {
  const html = sanitizeHtml(marked.parse(withPlaceholders(text, placeholders)));
  return <MjmlHtml html={html} />;
};

function withPlaceholders(text, placeholders: { [key: string]: string } = {}) {
  placeholders = { ...placeholders, ...defaultPlaceholders };
  let translated = text;
  for (const key in placeholders) {
    translated = translated.replaceAll(`{${key}}`, placeholders[key]);
  }
  return translated;
}
