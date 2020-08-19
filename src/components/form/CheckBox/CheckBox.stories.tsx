/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import CheckBox from "./CheckBox";

// ===== export 정보
export default {
  title: "form/CheckBox",
  component: CheckBox,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const props = {
    checked: boolean("checked", false),
    disabled: boolean("disabled", false),
    circleBox: boolean("circleBox", false),
    label: text("label", "label"),
    onChange: action("onChange"),
  };

  return <CheckBox {...props} />;
};
