import { MjmlButton } from "mjml-react";

import { CtaOptions } from "../types";
import { black, gold, grayLight } from "./theme";
import { leadingTight, textBase, borderBase } from "./theme";

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
  options?: CtaOptions;
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  link,
  uiText,
  options = {},
}) => {
  const {
    accent = black,
    color = grayLight,
    accentDark = gold,
    colorDark = black,
  } = options;
  return (
    <>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textBase}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={accent}
        color={color}
        borderRadius={borderBase}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textBase}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={accentDark}
        color={colorDark}
        borderRadius={borderBase}
        cssClass="dark-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};

export default ButtonPrimary;
