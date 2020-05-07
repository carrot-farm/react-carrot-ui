/** @jsx jsx */
import { useCallback, useState } from 'react';
import { jsx, css } from '@emotion/core';

import styles, { ColorsType } from '../../styles';
import colors from '../../styles/colors';

// ===== type
// # props type
type DividerPropsType = {
  /** 높이 */
  height?: number;
  /** 선의 색상 */
  color?: ColorsType;
};

// ===== component
function Divider({
  height = 1,
  color = 'grey-lighten-3',
}: DividerPropsType) {

  return (
    <div css={[rootStyle(height, color)]}></div>
  )
}

// ===== styles
const rootStyle = (height: number, color: ColorsType) => css`
  height: ${height}px;
  background-color: ${styles.getColor(color)};
  width: 100%;
`;

// ===== export
export default Divider;