/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Input from './Input';

// ===== export 정보
export default {
  title: 'form|Input',
  component: Input,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const value = text('value', 'value') ;
  const type = select('type', ['text', 'date', 'number'], 'text');
  const label = text('label', 'label') ;
  const helperText = text('helperText', 'headText') ;
  const error = boolean('error', false);
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const onChange = action('onChange');

  return (
    <Input
      type={type}
      value={value}
      label={label}
      helperText={helperText}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
}