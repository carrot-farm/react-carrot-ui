import { css, keyframes } from '@emotion/core';

import { getColor } from '../../styles'
import colors from '../../styles/colors';
import { TColorKeys, TMainColorKeys } from '../../types/colors';

export default css`
  margin: auto;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  letter-spacing: 0.5px;
  font-size: 14px;
  
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
    width: 25px !important;
    height: 25px !important;
    padding: 0 !important;
  `,
  m: css`
    width: 36px !important;
    height: 36px !important;
    padding: 0 !important;
  `,
  l: css`
    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
  `,
}

// ===== 마우스 오버시 컬러 스타일
export const hoverColorStyle = (color: TColorKeys) =>
  css`
    &:hover {
      background-color: ${colors[color]};
    }
  `;

// ===== border style
export const disabledStyle = (boolean?: boolean) => css`
  ${boolean ? `background-color: ${colors['grey-lighten-4']};` : ''}
  
`

// ===== 버튼 스타일
export const buttonStyle = (color: TColorKeys, disabled?: boolean) => css`
  background-color: transparent;
  border: none;
  outline: none;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  width: auto;
  padding: 0 16px;
  height: 36px;
  cursor: pointer;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  color: ${getColor(color)};
  overflow: hidden;
  ${disabled ? 'color: grey !important;' : ''}
`;

// ===== 최상단 스타일
export const rootStyle = css`
  display: inline-block;
  position: relative;
  line-height:0;
`;

// ===== 배경 색상
export const backgroundColorStyle = (color: TMainColorKeys) => css`
  background-color: ${getColor(color)}
`;

// ===== 보더 유무
export const borderStyle = (border: boolean) => css`
  border: 1px solid;
  box-sizing: border-box;
`;

// ===== 보더 색상
export const borderColorStyle = (color: TColorKeys) => css`
  border-color: ${getColor(color)};
`;

// ===== 컨테이너
export const containerStyle = css`
  position: relative;
  overflow: hidden;
`;



export const borderNone = css` border: 0;`;