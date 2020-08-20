/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

import Grid from "./Grid";

// ===== export 정보
export default {
  title: "layout/Grid",
  component: Grid,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const numbers = new Array(13).fill(0).map((_, i) => i);
  // console.log('> numbers ', numbers)
  const row = boolean("row", true);
  const spacing = select("spacing", numbers, 0);
  const xs = select("xs", numbers, 1);
  const s = select("s", numbers, 0);
  const m = select("m", numbers, 0);
  const l = select("l", numbers, 0);
  const offsetS = select("offsetS", numbers, 0);
  const offsetM = select("offsetM", numbers, 0);
  const offsetL = select("offsetL", numbers, 0);

  return (
    <Grid row={row} spacing={spacing}>
      <Grid
        xs={xs}
        s={s}
        m={m}
        l={l}
        offsetS={offsetS}
        offsetM={offsetM}
        offsetL={offsetL}
        backgroundColor="grey-lighten-4"
      >
        1
      </Grid>
      <Grid
        xs={xs}
        s={s}
        m={m}
        l={l}
        offsetS={offsetS}
        offsetM={offsetM}
        offsetL={offsetL}
        backgroundColor="grey-lighten-4"
      >
        1
      </Grid>
      <Grid
        xs={xs}
        s={s}
        m={m}
        l={l}
        offsetS={offsetS}
        offsetM={offsetM}
        offsetL={offsetL}
        backgroundColor="grey-lighten-4"
      >
        1
      </Grid>
      <Grid
        xs={xs}
        s={s}
        m={m}
        l={l}
        offsetS={offsetS}
        offsetM={offsetM}
        offsetL={offsetL}
        backgroundColor="grey-lighten-4"
      >
        1
      </Grid>
      <Grid
        xs={xs}
        s={s}
        m={m}
        l={l}
        offsetS={offsetS}
        offsetM={offsetM}
        offsetL={offsetL}
        backgroundColor="grey-lighten-4"
      >
        1
      </Grid>
    </Grid>
  );
};
