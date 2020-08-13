/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import BackLayer from "./BackLayer";

export default {
  title: "components|BackLayer",
  component: BackLayer,
  decorators: [withKnobs],
};

export const modal = () => {
  // # childer
  const children = text("children", "children");

  // # props
  const props: any = {
    sw: boolean("sw", false),
    alignItems: select(
      "alignItems",
      ["flex-start", "center", "flex-end"],
      "center"
    ),
    justifyContent: select(
      "justifyContent",
      ["flex-start", "center", "flex-end"],
      "center"
    ),
    onClick: action("backlayerClick"),
    onShow: action("onShow"),
    onComplete: action("onComplete"),
    onHide: action("onHide"),
    onHideComplete: action("onHideComplete"),
  };

  return (
    <div css={[style]}>
      <BackLayer {...props}>{children}</BackLayer>
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
