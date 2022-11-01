import Minimalist from "../Minimalist";
import { exampleProps } from "../util";

const props = {
  logo: exampleProps.logo,
  content:
    "Hello Amelita,\n\nWe’ve received your request to change your password. Use the link below to set up a new password for your account. This link is only usable once! If you need to, you can reinitiate the password process again [here](https://www.mailing.run).",
  ctaLabel: "Reset Password",
  ctaUrl: "https://example.com",
  signature: "♥,  \nThe BookBook Team",
};

export function scene3_resetPassword() {
  return <Minimalist {...props} />;
}
