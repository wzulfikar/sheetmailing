import { MjmlSection, MjmlColumn, MjmlText } from "mjml-react";
import { grayDark, textSm } from "./theme";

export default function Footer({ text }: { text: string }) {
  const year = new Date().getFullYear();
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="24px 24px 48px"
          fontSize={textSm}
          color={grayDark}
        >
          {text.replace(/{year}/g, year.toString())}
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
