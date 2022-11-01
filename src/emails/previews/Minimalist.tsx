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

export function example1_plain() {
  return preview(pick(exampleProps, ["content"]));
}

export function example2_withLogo() {
  return preview(pick(exampleProps, ["content", "logo"]));
}

export function example3_withIntro() {
  return preview(pick(exampleProps, ["content", "logo", "intro"]));
}

export function example4_withCTA() {
  return preview(
    pick(exampleProps, ["content", "logo", "intro", "ctaLabel", "ctaUrl"])
  );
}

export function example4_withCoverImage() {
  return preview(
    pick(exampleProps, [
      "content",
      "logo",
      "intro",
      "ctaLabel",
      "ctaUrl",
      "coverImage",
    ])
  );
}

export function example5_withSignature() {
  return preview(
    pick(exampleProps, [
      "content",
      "logo",
      "intro",
      "ctaLabel",
      "ctaUrl",
      "coverImage",
      "signature",
    ])
  );
}

export function example6_withFooter() {
  return preview(omit(exampleProps, ["options"]));
}

export function example7_withCustomCTA() {
  return preview(exampleProps);
}

export function example8_withMarkdown() {
  const intro = "Hello, **John!**";
  const content =
    "Hello John,  \nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again here.";
  return preview({ ...exampleProps, intro, content });
}

export function example9_withPlaceholders() {
  const intro = "{subject}";
  const content =
    "Hello {recipient_name}, you have requested a password reset.";
  const options = {
    placeholders: { subject: "Password reset", recipient_name: "John" },
  };
  return preview({ ...exampleProps, intro, content, options });
}
