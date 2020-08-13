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

import Align from "./Align";

// ===== export 정보
export default {
  title: "layout|Align",
  component: Align,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  return (
    <Align
      direction={select("Direction", ["horizontal", "vertical"], "horizontal")}
      justify={select(
        "Justify",
        ["flex-start", "center", "flex-end", "space-between", "space-around"],
        "flex-start"
      )}
      align={select("align", ["flex-start", "center", "flex-end"], "center")}
      space={number("Space", 8)}
    >
      <div style={{ width: 50, height: 50, border: "1px solid" }} />
      <div style={{ width: 50, height: 50, border: "1px solid" }} />
      <div style={{ width: 50, height: 50, border: "1px solid" }} />
      <div style={{ width: 50, height: 50, border: "1px solid" }} />
    </Align>
  );
};
Default.story = {
  title: "기본",
};
