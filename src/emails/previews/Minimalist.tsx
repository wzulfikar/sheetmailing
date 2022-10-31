import { pick, omit } from "remeda";

import Minimalist from "../Minimalist";

const sampleProps = {
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

export function sample1_plain() {
  return <Minimalist {...pick(sampleProps, ["content"])} />;
}

export function sample2_withLogo() {
  return <Minimalist {...pick(sampleProps, ["content", "logo"])} />;
}

export function sample3_withIntro() {
  return <Minimalist {...pick(sampleProps, ["content", "logo", "intro"])} />;
}

export function sample4_withCTA() {
  return (
    <Minimalist
      {...pick(sampleProps, ["content", "logo", "intro", "ctaLabel", "ctaUrl"])}
    />
  );
}

export function sample4_withCoverImage() {
  return (
    <Minimalist
      {...pick(sampleProps, [
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

export function sample5_withSignature() {
  return (
    <Minimalist
      {...pick(sampleProps, [
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

export function sample6_withFooter() {
  return <Minimalist {...omit(sampleProps, ["options"])} />;
}

export function sample7_withCustomCTA() {
  return <Minimalist {...sampleProps} />;
}

export function sample8_withMarkdown() {
  const intro = "Hello, **John!**";
  const content =
    "Hello John,  \nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again here.";
  return <Minimalist {...sampleProps} intro={intro} content={content} />;
}

export function sample9_withPlaceholders() {
  const intro = "{subject}";
  const content =
    "Hello {recipient_name}, you have requested a password reset.";
  return (
    <Minimalist
      {...sampleProps}
      intro={intro}
      content={content}
      options={{
        placeholders: { subject: "Password reset", recipient_name: "John" },
      }}
    />
  );
}
