import { css, keyframes } from '@emotion/core';

import colors from '../styles/colors';
import { ColorsType } from '../styles';

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
    height: 22px;
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


// ===== 마우스 오버시 컬러 스타일
export const hoverColorStyle = (color: ColorsType) =>
  css`
    &:hover {
      background-color: ${colors[color]};
    }
  `;


// ===== 리플 
// # 키프레임
const ripple = keyframes`
  to {
    opacity: 0;
    transform: scale(2);
  }
`;



export const borderNone = css` border: 0;`;