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

import Slosh from './Slosh';

// ===== export 정보
export default {
  title: 'components|Slosh',
  component: Slosh,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const props = {
    disabled: boolean('disabled', false),
  };

  return (
    <Slosh {...props}>
      <div style={{width: 100, height: 100, background: '#ff9547'}}>
      </div>
    </Slosh>
  );
};

// ===== 메인 색상 키 배열
const getKeyArr = (obj: any) => {
  const arr = []
  for(const k in obj){
    arr.push(k)
  }
  return arr;
}