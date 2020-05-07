/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Folding from './Folding';
import { flexAlignValues } from '../../styles';

// ===== export 정보
export default {
  title: 'components|Folding',
  component: Folding,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const sw = boolean('sw', true) ;

  return (
    <Folding sw={sw}>
      <div style={{height: 100, width: 100, backgroundColor: '#ff9547'}}>
        carrot
      </div>
    </Folding>
  );
}