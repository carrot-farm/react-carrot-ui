/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Collapse from './Collapse';
import { flexAlignValues } from '../styles';

// ===== export 정보
export default {
  title: 'components|Collapse',
  component: Collapse,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const headText = text('headText', 'headText') ;
  const children = text('children', 'children') ;

  return (
    <Collapse headText={headText} >
      {children}
    </Collapse>
  );
}