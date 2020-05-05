/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  number,
  select,
} from "@storybook/addon-knobs";

import Divider from './Divider';
import { colorTypes } from '../styles';

// ===== export 정보
export default {
  title: 'components|Divider',
  component: Divider,
  decorators: [withKnobs],
};

// ===== 컴포넌트
// # default
export const Default = () => {
  const props = {
    height: number('height', 1),
    color: select('children', colorTypes, 'grey-lighten-2')
  };

  return (
    <Divider {...props} />
  );
}