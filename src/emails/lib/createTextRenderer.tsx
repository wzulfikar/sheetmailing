import { MjmlHtml } from "mjml-react/extensions";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

// eslint-disable-next-line react/display-name
export const createTextRenderer = (placeholders) => (text: string) => {
  const year = new Date().getFullYear();
  const translatePlaceholders = text.replaceAll("{year}", year.toString());
  const html = sanitizeHtml(marked.parse(translatePlaceholders));

  return <MjmlHtml html={html} />;
};
