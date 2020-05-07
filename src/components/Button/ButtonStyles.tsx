import { css, keyframes } from '@emotion/core';

import colors from '../../styles/colors';
import { ColorsType } from '../../styles';

export default css`
  margin: auto;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  letter-spacing: 0.5px;
  font-size: 14px;
  padding: 0 16px;
  height: 36px;
  // width: 200px;
  text-align: center;
  box-sizing: border-box;
  &[disabled] {
    cursor: pointer;
  }
  transition: background-color .3s;
  &[disabled] {
    cursor: default;
    background-color: ${colors['grey-lighten-5']};
    color: ${colors['grey']};
  }
  &[disabled]:hover {
    background-color: ${colors['grey-lighten-5']};
  }
`;

// ===== 사이즈
export const sizeStyle = {
  s: css`
    height: 25px;
    padding: 0 13px
  `,
  m: css`
    height: 36px;
    padding: 0 16px
  `,
  l: css`
    height: 40px;
    padding: 0 20px
  `,
};


// ===== border radius
export const borderRadiusStyle = (radius: string) => css`border-radius: ${radius}`;

// ===== 정사각현
export const squareStyle = {
  s: css`
    width: 25px;
    height: 25px;
    padding: 0 !important;
  `,
  m: css`
    width: 36px;
    height: 36px;
    padding: 0 !important;
  `,
  l: css`
    width: 40px;
    height: 40px;
    padding: 0 !important;
  `,
}

// ===== 마우스 오버시 컬러 스타일
export const hoverColorStyle = (color: ColorsType) =>
  css`
    &:hover {
      background-color: ${colors[color]};
    }
  `;





export const borderNone = css` border: 0;`;