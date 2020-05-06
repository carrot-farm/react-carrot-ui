/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  object,
  array,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Select from './Select';
import { colorTypes } from '../styles';

// ===== export 정보
export default {
  title: 'form|Select',
  component: Select,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const options = [
    { text: 'A', value: 'A' },
    { text: 'B', value: 'B' },
    { text: 'C', value: 'C', disabled: true },
    { text: 'D', value: 'D' },
    { text: 'E', value: 'E' },
  ]
  const props = {
    name: text('name', 'select'),
    value: text('value', 'D'),
    native: boolean('native', false),
    options: object('options', options),

    onChange: action('onChange'),
  };

  return (
    <div>
      <Select {...props} />
    </div>
  );
}