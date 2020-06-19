/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  number,
  object,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';

import TextField from './TextField';

// ===== export 정보
export default {
  title: 'form|TextField',
  component: TextField,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const props = {
    value: text('value', 'valueekdmfek\nkmdfefe\n\dskdmfd'),
    label: text('label', 'label'),
    rows: number('rows', 1),
    disabled: boolean('disabled', false),
    readOnly: boolean('readOnly', false),
    autoHeight: boolean('autoHeight', true),
    error: boolean('error', false),
    onChange: action('onChange'),
  };
  
  const [value, setValue] = useState('');
  const handleOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log('> ', e.currentTarget.value)
    setValue(e.currentTarget.value);
  }

  return (
    <React.Fragment>
        <TextField 
          name="name" {...props} 
          // value={value}
          // onChange={handleOnChange} 
        />
    </React.Fragment>
  );
}