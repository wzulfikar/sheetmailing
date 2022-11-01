type PreviewIndexResponseBody = {
  previews: [string, string[]][];
  previewText: {
    [path: string]: string;
  };
};

type ShowPreviewResponseBody = {
  errors: MjmlError[];
  htmlLint: HtmlLintError[];
  html: string;
};

type Intercept = {
  id: string;
  html: string;
  to?: string | string[];
  from?: string;
  subject?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

type SendPreviewRequestBody = {
  to: string;
  html?: string;
  previewFunction?: string;
  previewClass?: string;
  subject: string;
  smtpInfo: {
    user: string;
    password: string;
    host: string;
    port: number;
  }
};

type SendPreviewResponseBody = {
  success: boolean;
  error?: string;
};

type ShowPreviewResponseBody = {
  errors: MjmlError[];
  htmlLint: HtmlLintError[];
  html: string;
};

type MjmlError = {
  line: number;
  message: string;
  tagName: string;
  formattedMessage: string;
};

type HtmlLintError = {
  message: string;
};

type ViewMode = "desktop" | "mobile" | "html";

type MailingConfig = {
  anonymousId?: string | null;
  emailsDir?: string;
  port?: number;
  quiet?: boolean;
};
