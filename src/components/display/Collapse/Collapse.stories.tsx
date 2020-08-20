/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import Collapse from "./Collapse";

// ===== export 정보
export default {
  title: "display/Collapse",
  component: Collapse,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const headText = text("headText", "headText");
  const children = text("children", "children");
  const childrenFullWidth = boolean("childrenFullWidth", false);
  const show = boolean("show", false);

  return (
    <Collapse
      headText={headText}
      childrenFullWidth={childrenFullWidth}
      show={show}
    >
      {children}
    </Collapse>
  );
};
