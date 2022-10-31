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

export function example1_plain() {
  return <Minimalist {...pick(exampleProps, ["content"])} />;
}

export function example2_withLogo() {
  return <Minimalist {...pick(exampleProps, ["content", "logo"])} />;
}

export function example3_withIntro() {
  return <Minimalist {...pick(exampleProps, ["content", "logo", "intro"])} />;
}

export function example4_withCTA() {
  return (
    <Minimalist
      {...pick(exampleProps, [
        "content",
        "logo",
        "intro",
        "ctaLabel",
        "ctaUrl",
      ])}
    />
  );
}

export function example4_withCoverImage() {
  return (
    <Minimalist
      {...pick(exampleProps, [
        "content",
        "logo",
        "intro",
        "ctaLabel",
        "ctaUrl",
        "coverImage",
      ])}
    />
  );
}

export function example5_withSignature() {
  return (
    <Minimalist
      {...pick(exampleProps, [
        "content",
        "logo",
        "intro",
        "ctaLabel",
        "ctaUrl",
        "coverImage",
        "signature",
      ])}
    />
  );
}

export function example6_withFooter() {
  return <Minimalist {...omit(exampleProps, ["options"])} />;
}

export function example7_withCustomCTA() {
  return <Minimalist {...exampleProps} />;
}

export function example8_withMarkdown() {
  const intro = "Hello, **John!**";
  const content =
    "Hello John,  \nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again here.";
  return <Minimalist {...exampleProps} intro={intro} content={content} />;
}

export function example9_withPlaceholders() {
  const intro = "{subject}";
  const content =
    "Hello {recipient_name}, you have requested a password reset.";
  return (
    <Minimalist
      {...exampleProps}
      intro={intro}
      content={content}
      options={{
        placeholders: { subject: "Password reset", recipient_name: "John" },
      }}
    />
  );
}
