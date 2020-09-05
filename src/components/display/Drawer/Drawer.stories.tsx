/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  withKnobs,
  text,
  boolean,
  select,
  number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Drawer from "./Drawer";

export default {
  title: "display/Drawer",
  component: Drawer,
  decorators: [withKnobs],
};

export const modal = () => {
  // # childer
  const children = text("children", "children");

  // # props
  const props: any = {
    sw: boolean("sw", false),
    width: text("width", "320px"),
    anchor: select("anchor", ["left", "right", "top", "bottom"], "left"),
    onClose: action("onClose"),
  };

  return (
    <div css={[style]}>
      <Drawer {...props}>{children}</Drawer>
    </div>
  );
};

modal.story = {
  name: "Default",
};

const style = css`
  div {
  }
`;
