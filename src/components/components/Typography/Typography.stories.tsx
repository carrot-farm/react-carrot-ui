/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  withKnobs,
  boolean,
  select,
  text,
  number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Typography, { TTypography } from "./Typography";
import colors from "../../../styles/colors";
import { TColorKeys } from "../../../types/colors";

// ===== export 정보
export default {
  title: "components/Typography",
  component: Typography,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const size: TTypography["size"][] = ["xs", "s", "m", "l", "xl"];
  const color: TColorKeys[] = Object.keys(colors) as TColorKeys[];
  const component: TTypography["component"][] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "div",
    "span",
    "p",
  ];
  // console.log("> ", color);

  return (
    <Typography
      size={select("Size", size, "m")}
      color={select("Color", color, "grey-darken-2")}
      weight={select("Weight", ["lighter", "normal", "bolder"], "normal")}
      component={select("Component", component, "p")}
    >
      {text("children", "Typography")}
    </Typography>
  );
};
