import { pick, omit } from "remeda";

import Minimalist from "../Minimalist";

const exampleProps = {
  logo: "https://s3.amazonaws.com/lab.campsh.com/bb-transparent%402x.png",
  intro: "Hello, John!",
  coverImage: "https://s3.amazonaws.com/lab.campsh.com/bb-hero%402x.jpg",
  content:
    "Hello John,\nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again here.",
  ctaLabel: "Book a Reservation",
  ctaUrl: "https://example.com",
  footer: "© {year} BookBook  ·  Unsubscribe",
  signature: "♥\nThe BookBook Team",
  // Pass the `options` props to override default options
  options: {
    cta: {
      accent: "#37eaa5",
      color: "black",
      accentDark: "#37eaa5",
    },
  },
};

const preview = (props, customProps = {}) => (
  <Minimalist {...props} {...customProps} />
);

export function custom_preview(customProps) {
  return preview(pick(exampleProps, ["content"]), customProps);
}

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
