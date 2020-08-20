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

import RadioGroup from "./RadioGroup";

// ===== export 정보
export default {
  title: "form/RadioGroup",
  component: RadioGroup,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const props = {
    items: [
      {
        name: "radio",
        value: "a",
        label: "a",
      },
      {
        name: "radio",
        value: "b",
        label: "b",
      },
      {
        name: "cradio",
        value: "c",
        label: "c",
      },
    ],
  };

  return (
    <RadioGroup
      {...props}
      defaultValue={text("defaultValue", "b")}
      value={text("value", "c")}
      onChange={action("onChange")}
    />
  );
};
