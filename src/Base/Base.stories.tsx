/** @jsx jsx */
import Base, { ComponentValues } from './Base';
import { jsx, css } from '@emotion/core';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs';

import { colorTypes } from '../styles';

export default {
  title: 'components|Base',
  component: Base,
  decorators: [withKnobs],
};

export const base = ()  => {
  const children = text("children", 'children');

  const component = select("component", ComponentValues, "div");
  // # margin
  const marginTop = number('marginTop', 0);
  const marginRight = number('marginRight', 0);
  const marginBottom = number('marginBottom', 0);
  const marginLeft = number('marginLeft', 0);

  const paddingTop = number('paddingTop', 0);
  const paddingRight = number('paddingRight', 0);
  const paddingBottom = number('paddingBottom', 0);
  const paddingLeft = number('paddingLeft', 0);

  const width = text('width', '100px');
  const height = text('height', '100px');
  
  const color = select('color', colorTypes, 'black');
  const backgroundColor = select('backgroundColor', colorTypes, 'grey');

  return (
    <div css={[style]}>
      <Base
        component={component}

        marginTop={marginTop}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginLeft={marginLeft}

        paddingTop={paddingTop}
        paddingRight={paddingRight}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}

        width={width}
        height={height}

        color={color}
        backgroundColor={backgroundColor}
      >{children}</Base>
    </div>
  )
};

base.story = {
  name: 'Default'
};

const style = css`
  div {
  }
`