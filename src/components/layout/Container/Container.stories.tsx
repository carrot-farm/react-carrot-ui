/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import Container from "./Container";

// ===== export 정보
export default {
  title: "layout/Container",
  component: Container,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const children = text("children", "children");
  const fullWidth = boolean("fullWidth", false);

  return (
    <Container backgroundColor={"grey-lighten-1"} fullWidth={fullWidth}>
      {children}
    </Container>
  );
};
