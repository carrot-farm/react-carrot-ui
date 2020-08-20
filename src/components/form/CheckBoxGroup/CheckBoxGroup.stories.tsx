/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  withKnobs,
  boolean,
  select,
  text,
  object,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import CheckBoxGroup from "./CheckBoxGroup";

// ===== export 정보
export default {
  title: "form/CheckBoxGroup",
  component: CheckBoxGroup,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const props = {
    items: [
      {
        name: "a",
        label: "a",
        checked: true,
      },
      {
        name: "b",
        label: "b",
      },
      {
        name: "c",
        label: "c",
      },
    ],
  };

  return <CheckBoxGroup {...props} onChange={action("onChange")} />;
};
