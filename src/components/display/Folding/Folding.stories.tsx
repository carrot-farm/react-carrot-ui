/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Folding from "./Folding";

// ===== export 정보
export default {
  title: "display/Folding",
  component: Folding,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const sw = boolean("sw", true);

  return (
    <Folding sw={sw}>
      <div style={{ height: 100, width: 100, backgroundColor: "#ff9547" }}>
        carrot
      </div>
    </Folding>
  );
};
