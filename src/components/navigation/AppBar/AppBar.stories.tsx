/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import AppBar from "./AppBar";
import { flexAlignValues } from "../../../styles";

// ===== export 정보
export default {
  title: "navigation/AppBar",
  component: AppBar,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const children = text("children", "children");
  const height = text("height", "60px");
  const fullWidth = boolean("fullWidth", false);
  const align = select("align", flexAlignValues, "flex-start");

  return (
    <div>
      <AppBar
        height={height}
        fullWidth={fullWidth}
        align={align}
        backgroundColor="grey-lighten-5"
      >
        {children}
      </AppBar>
    </div>
  );
};
// # align
export const Align = () => {
  const align = select("align", flexAlignValues, "flex-start");
  return (
    <AppBar align={align} backgroundColor="grey-lighten-5" marginTop={2}>
      <div css={box}></div>
      <div css={box}></div>
    </AppBar>
  );
};

// ===== styles
const box = css`
  width: 50px;
  height: 50px;
  color: #aaaaaa;
  border: 1px solid;
  box-sizing: borderbox;
`;
