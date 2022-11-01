import Minimalist from "../Minimalist";
import { exampleProps } from "../util";

const props = {
  logo: exampleProps.logo,
  divider: true,
  intro: "Security Alert: New Sign-In",
  content: `Hello Amelita,

We noticed a new sign-in to your BookBook account on a Mac device. If this was you, you don’t need to do anything. If not, please reply to this email and we’ll help you secure your account.

- Date: July 14, 2022 4:26 PM PST
- Device: Mac
- Browser: Safari
- Location: Los Angeles, CA
- IP Address: XXX.XX.XXX.XX"`,
  signature: "♥,  \nThe BookBook Team",
};

export function scene1_newSignIn() {
  return <Minimalist {...props} />;
}
