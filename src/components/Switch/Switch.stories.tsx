/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  number,
  object,
  select,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Switch from './Switch';
import { mainColorsArr } from '../../styles'

// ===== export 정보
export default {
  title: 'form|Switch',
  component: Switch,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const props = {
    checked: boolean('checked', false),
    disabled: boolean('disabled', false),
    mainColor: select('mainColor', mainColorsArr, 'blue'),
    onChange: action('onChange'),
  };

  return (
    <Switch name="switch" {...props} />
  );
}