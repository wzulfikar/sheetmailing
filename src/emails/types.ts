export type CtaOptions = {
  accent?: string;
  color?: string;
  accentDark?: string;
  colorDark?: string;
};

export type EmailPayload = {
  content: string;

  logo?: string;
  coverImage?: string;
  intro?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  signature?: string;
  footer?: string;
  divider?: boolean;
  options?: {
    cta?: CtaOptions;
    placeholders?: {
      subject?: string;
      recipient?: string;
      recipient_name?: string;
    };
  };
};
