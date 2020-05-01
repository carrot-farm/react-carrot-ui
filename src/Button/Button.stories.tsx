/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Button from './Button';
import { colorTypes } from '../styles';

// ===== export 정보
export default {
  title: 'components|Button',
  component: Button,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const size = select('size', ['s', 'm', 'l'], 'm');
  const disabled = boolean('disabled', false);
  const color = select('color', colorTypes, 'white');
  const backgroundColor = select('backgroundColor', colorTypes, 'lime');
  const hoverColor = select('hoverColor', colorTypes, 'lime-darken-1');
  const rippleColor = select('rippleColor', colorTypes, 'white');
  const border = boolean('border', false);
  const borderColor = select('borderColor', colorTypes, 'transparent');

  return (
    <Button 
      size={size} 
      onClick={action("onClick")} 
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      rippleColor={rippleColor}
      border={border}
      borderColor={borderColor}
    >
      Button
    </Button>
  );
}