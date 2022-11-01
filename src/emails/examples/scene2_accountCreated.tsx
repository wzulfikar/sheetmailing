import Minimalist from "../Minimalist";
import { exampleProps } from "../util";

const props = {
  logo: exampleProps.logo,
  coverImage: exampleProps.coverImage,
  intro: "Amelita, your table awaits.",
  content: `Thank you for joining BookBook! We’re excited to help you enjoy great meals without any begging, guessing, waiting or phone calls. Just a couple taps, and the table is yours.`,
  ctaLabel: "Book a Reservation",
  ctaUrl: "https://example.com",
  signature: "Enjoy!  \nThe BookBook Team",
};

export function scene2_accountCreated() {
  return <Minimalist {...props} />;
}
