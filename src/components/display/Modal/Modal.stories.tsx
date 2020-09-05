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

import Modal from "./Modal";

export default {
  title: "display/Modal",
  component: Modal,
  decorators: [withKnobs],
};

export const modal = () => {
  // # childer
  const children = text("children", "children");

  // # props
  const props: any = {
    sw: boolean("sw", false),
    width: text("width", "400px"),
    onClose: action("onClose"),
  };

  return (
    <div css={[style]}>
      <Modal {...props}>{children}</Modal>
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
