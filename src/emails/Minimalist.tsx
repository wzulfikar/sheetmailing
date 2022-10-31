import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlSpacer,
} from "mjml-react";
import ButtonPrimary, { ButtonOptions } from "./components/ButtonPrimary";
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textXl,
} from "./components/theme";

type Payload = {
  content: string;

  logo?: string;
  coverImage?: string;
  intro?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  signature?: string;
  footer?: string;
  options?: {
    cta?: ButtonOptions;
  };
};
const Minimalist = ({
  content,
  logo,
  coverImage,
  intro,
  ctaLabel,
  ctaUrl,
  signature,
  footer,
  options,
}: Payload) => {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        {logo && <Header loose logo={logo} />}
        {coverImage && (
          <MjmlSection padding="0">
            <MjmlColumn>
              <MjmlImage
                cssClass="hero"
                padding="0 0 40px"
                align="left"
                src={coverImage}
              />
            </MjmlColumn>
          </MjmlSection>
        )}
        <MjmlSection padding="0 24px" cssClass="smooth">
          <MjmlColumn>
            {intro && (
              <MjmlText
                cssClass="paragraph"
                padding="0"
                fontSize={textXl}
                lineHeight={leadingTight}
              >
                {intro}
              </MjmlText>
            )}
            <MjmlText
              padding="24px 0 0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
              cssClass="paragraph"
            >
              {content}
            </MjmlText>
            <MjmlSpacer height="24px" />
            {ctaLabel && ctaUrl && (
              <ButtonPrimary
                link={ctaUrl}
                uiText={ctaLabel}
                options={options?.cta}
              />
            )}
            {signature && (
              <>
                <MjmlSpacer height="24px" />
                <MjmlText
                  padding="0"
                  fontSize={textBase}
                  lineHeight={leadingRelaxed}
                  cssClass="paragraph"
                >
                  {signature}
                </MjmlText>
              </>
            )}
          </MjmlColumn>
        </MjmlSection>
        {footer && <Footer text={footer} />}
      </MjmlBody>
    </Mjml>
  );
};

export default Minimalist;
