/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, select, number } from "@storybook/addon-knobs";

import Ripple from "./Ripple";
import { colorTypes } from "../../../styles";

// ===== export 정보
export default {
  title: "others/Ripple",
  component: Ripple,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const color = select("color", colorTypes, "white");
  const duration = number("duration(ms)", 850);

  return (
    <div css={[style]}>
      <Ripple color={color} duration={duration} />
    </div>
  );
};

// ===== style
const style = css`
  position: relative;
  overlow: hidden;
  width: 100px;
  height: 100px;
  background-color: #ff9547;
`;
