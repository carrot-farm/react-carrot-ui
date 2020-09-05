/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Button from "./Button";
import { colorTypes, mainColorsArr } from "../../../styles";

// ===== export 정보
export default {
  title: "form/Button",
  component: Button,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const size = select("size", ["s", "m", "l"], "m");
  const disabled = boolean("disabled", false);
  const color = select("color", colorTypes, "white");
  const backgroundColor = select("backgroundColor", mainColorsArr, "lime");
  const hoverColor = select("hoverColor", colorTypes, "lime-darken-1");
  const rippleColor = select("rippleColor", colorTypes, "white");
  const border = boolean("border", false);
  const borderColor = select("borderColor", colorTypes, "transparent");
  const borderRadius = text("borderRadius", "5px");
  const square = boolean("square", false);

  return (
    <Button
      size={size}
      onClick={action("onClick")}
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      rippleColor={rippleColor}
      border={border}
      borderColor={borderColor}
      borderRadius={borderRadius}
      square={square}
    >
      Button
    </Button>
  );
};
