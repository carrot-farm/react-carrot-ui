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
import { mainColorsArr } from '../../styles';

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
  const mainColor = select('mainColor', mainColorsArr, 'lime' )
  const disabled = boolean('disabled', false);
  const onChange = action('onChange');

  return (
    <div>
      <Radio
        name="radio"
        value={value}
        label={'A'}
        mainColor={mainColor}
        disabled={disabled}
        onChange={onChange}
      />
      <br />
      <Radio
        name="radio"
        value={value}
        label={'B'}
        mainColor={mainColor}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}