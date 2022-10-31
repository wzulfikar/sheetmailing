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
import ButtonPrimary from "./components/ButtonPrimary";
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textXl,
} from "./components/theme";
import { EmailPayload } from "./types";
import { createTextRenderer } from "./lib/createTextRenderer";

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
}: EmailPayload) => {
  const renderText = createTextRenderer(options?.placeholders);

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
                {renderText(intro)}
              </MjmlText>
            )}
            <MjmlText
              padding="24px 0 0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
              cssClass="paragraph"
            >
              {renderText(content)}
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
                  {renderText(signature)}
                </MjmlText>
              </>
            )}
          </MjmlColumn>
        </MjmlSection>
        {footer && <Footer text={renderText(footer)} />}
      </MjmlBody>
    </Mjml>
  );
};

export default Minimalist;
