/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  text,
  boolean,
  select,
  number,
} from "@storybook/addon-knobs";

import Base, { ComponentValues } from './Base';
import {
  colorTypes,
  positionValues,
  textAlignValues,
  displayValues,
  flexAlignValues,
  flexWrapValues,
  flexDirectionValues,
} from "../../styles";

export default {
  title: 'components|Base',
  component: Base,
  decorators: [withKnobs],
};

export const base = ()  => {
  // # margin
  const children = text("children", 'children');

  const props: any = {
    component: select("component", ComponentValues, "div"),

    marginTop: number('marginTop', 0),
    marginRight: number('marginRight', 0),
    marginBottom: number('marginBottom', 0),
    marginLeft: number('marginLeft', 0),

    paddingTop: number('paddingTop', 0),
    paddingRight: number('paddingRight', 0),
    paddingBottom: number('paddingBottom', 0),
    paddingLeft: number('paddingLeft', 0),

    border: boolean('border', false),
    borderTop: boolean('borderTop', false),
    borderRight: boolean('borderRight', false),
    borderBottom: boolean('borderBottom', false),
    borderLeft: boolean('borderLeft', false),
    borderColor: select('borderColor', colorTypes, 'transparent'),

    width: text('width', '100px'),
    height: text('height', '100px'),

    color: select('color', colorTypes, 'black'),
    backgroundColor: select('backgroundColor', colorTypes, 'grey'),
    
    textAlign: select('textAlign', textAlignValues, 'center'),
    position: select('position', positionValues, 'relative'),
    display: select('display', displayValues, 'flex'),
    flexAlign: select('flexAlign', flexAlignValues, 'middle'),
    flexWrap: select('flexWrap', flexWrapValues, 'nowrap'),
    flexDirection: select('flexDirection', flexDirectionValues, 'row'),
  }

  return (
    <div css={[style]}>
      <Base {...props}>{children}</Base>
    </div>
  );
};

base.story = {
  name: 'Default'
};

const style = css`
  div {
  }
`