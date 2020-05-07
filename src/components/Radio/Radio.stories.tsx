/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Radio from './Radio';
import { colorTypes } from '../../styles';

// ===== export 정보
export default {
  title: 'form|Radio',
  component: Radio,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const value = text('value', 'value');
  const themeColor = select('themeColor',colorTypes, 'lime' )
  const disabled = boolean('disabled', false);
  const onChange = action('onChange');

  return (
    <div>
      <Radio
        name="radio"
        value={value}
        label={'A'}
        themeColor={themeColor}
        disabled={disabled}
        onChange={onChange}
      />
      <br />
      <Radio
        name="radio"
        value={value}
        label={'B'}
        themeColor={themeColor}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}