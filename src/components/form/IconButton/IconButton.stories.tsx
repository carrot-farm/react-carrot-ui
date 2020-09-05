/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";

import IconButton from "./IconButton";
import { colorTypes, mainColorsArr } from "../../../styles";
import { iconTypes } from "../../others/Icon/Icon";

// ===== export 정보
export default {
  title: "form/IconButton",
  component: IconButton,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const size = select("size", ["s", "m", "l"], "m");
  const disabled = boolean("disabled", false);
  const color = select("color", colorTypes, "black");
  const backgroundColor = select(
    "backgroundColor",
    mainColorsArr,
    "transparent"
  );
  const hoverColor = select("hoverColor", colorTypes, "grey-lighten-5");
  const rippleColor = select("rippleColor", colorTypes, "grey-darken-1");
  const border = boolean("border", true);
  const iconName = select("iconName", iconTypes, "home");

  return (
    <IconButton
      size={size}
      iconName={iconName}
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      rippleColor={rippleColor}
      border={border}
    />
  );
};

// ===== styles
