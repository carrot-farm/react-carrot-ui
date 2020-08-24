/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, select, object, number } from "@storybook/addon-knobs";
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
  const items = [
    {
      name: "a",
      label: "a",
      value: true,
    },
    {
      name: "b",
      label: "b",
    },
    {
      name: "c",
      label: "c",
    },
  ];

  const value = ["c", "b"];

  return (
    <CheckBoxGroup
      value={object("Value", value)}
      items={object("Items", items)}
      direction={select("Direction", ["horizontal", "vertical"], "horizontal")}
      justify={select(
        "Justify",
        ["flex-start", "center", "flex-end", "space-between", "space-around"],
        "flex-start"
      )}
      align={select("align", ["flex-start", "center", "flex-end"], "center")}
      space={number("Space", 8)}
      onChange={action("onChange")}
    />
  );
};
