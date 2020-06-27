/** @jsx jsx */
import { useCallback, useState } from 'react';
import { jsx, css } from '@emotion/core';

import styles from '../../styles';
import colors from '../../styles/colors';
import { TColorKeys } from '../../types/colors'

// ===== type
// # props type
interface DividerPropsType {
  /** 높이 */
  height?: number;
  /** 선의 색상 */
  color?: TColorKeys;
};

// ===== component
function Divider({
  height = 1,
  color = 'grey-lighten-3',
  ...args
}: DividerPropsType) {

  return (
    <div {...args} css={[rootStyle(height, color)]}></div>
  )
}

// ===== styles
const rootStyle = (height: number, color: TColorKeys) => css`
  height: ${height}px;
  background-color: ${styles.getColor(color)};
  width: 100%;
`;

// ===== export
export default Divider;