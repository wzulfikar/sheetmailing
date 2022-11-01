import { pick, omit } from "remeda";
import { exampleProps } from "../util";

import Minimalist from "../Minimalist";

const preview = (props, customProps = {}) => (
  <Minimalist {...props} {...customProps} />
);

export function example1_plain(customProps) {
  return preview(pick(exampleProps, ["content"]), customProps);
}

export function example2_withLogo(customProps) {
  return preview(pick(exampleProps, ["content", "logo"]), customProps);
}

export function example3_withIntro(customProps) {
  return preview(pick(exampleProps, ["content", "logo", "intro"]), customProps);
}

export function example4_withCTA(customProps) {
  return preview(
    pick(exampleProps, ["content", "logo", "intro", "ctaLabel", "ctaUrl"]),
    customProps
  );
}

export function example4_withCoverImage(customProps) {
  return preview(
    pick(exampleProps, [
      "content",
      "logo",
      "intro",
      "ctaLabel",
      "ctaUrl",
      "coverImage",
    ]),
    customProps
  );
}

export function example5_withSignature(customProps) {
  return preview(
    pick(exampleProps, [
      "content",
      "logo",
      "intro",
      "ctaLabel",
      "ctaUrl",
      "coverImage",
      "signature",
    ]),
    customProps
  );
}

export function example6_withFooter(customProps) {
  return preview(omit(exampleProps, ["options", "divider"]), customProps);
}

export function example6_withDivider(customProps) {
  return preview(omit(exampleProps, ["options"]), customProps);
}

export function example7_withCustomCTA(customProps) {
  return preview(exampleProps, customProps);
}

export function example8_withMarkdown(customProps) {
  const intro = "Hello, **John!**";
  const content =
    "Hello John,  \nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again here.";
  return preview({ ...exampleProps, intro, content }, customProps);
}

export function example9_withPlaceholders(customProps) {
  const intro = "{subject}";
  const content =
    "Hello {recipient_name}, you have requested a password reset.";
  const options = {
    placeholders: { subject: "Password reset", recipient_name: "John" },
  };
  return preview({ ...exampleProps, intro, content, options }, customProps);
}
