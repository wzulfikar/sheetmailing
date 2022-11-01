import Minimalist from "../Minimalist";
import { exampleProps } from "../util";

const props = {
  logo: exampleProps.logo,
  divider: true,
};

const bulletPoints = `- Salazar in Silver Lake
- Sunday, Aug 22 at 1:30pm
- Party of 4, patio

`;

export function scene4a_reservationWithError() {
  return (
    <Minimalist
      {...props}
      intro="Reservation Canceled"
      content={`${bulletPoints} If this was a mistake or if you changed your mind, you can use the link below to rebook your reservation. Learn more`}
      ctaLabel="Rebook Now"
      ctaUrl="#"
    />
  );
}

export function scene4b_reservationConfirmed() {
  return (
    <Minimalist
      {...props}
      intro="Reservation Confirmed"
      content={`${bulletPoints} Thanks for booking your reservation at Salazar with BookBook! If you need to cancel or make any changes, just click the link above.`}
      ctaLabel="View Reservation"
      ctaUrl="#"
    />
  );
}

export function scene4c_reservationChanged() {
  return (
    <Minimalist
      {...props}
      intro="Reservation Changed"
      content={`${bulletPoints} You’re all set! Your reservation at Salazar has been successfully changed. If you have any questions, please reply to this email.`}
      ctaLabel="View Reservation"
      ctaUrl="#"
    />
  );
}
