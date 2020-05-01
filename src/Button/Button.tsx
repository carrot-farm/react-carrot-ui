/** @jsx jsx */
import { jsx } from '@emotion/core';

import Base, { BaseProps } from '../Base/Base';
import { ColorsType } from '../styles'
import styles, { hoverColorStyle, sizeStyle, borderNone } from './ButtonStyles';
import Ripple from '../Ripple/Ripple';

// ===== 타입
type ButtonPropsType = BaseProps & {
  /** 버튼 타입 */
  type?: 'button' | 'submit';
  /** 버튼 사이즈 */
  size?: 's' | 'm' | 'l';
  /** 마우스 오버시 컬러 */
  hoverColor?: ColorsType;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 라벨 색상 */
  color?: ColorsType;
  /** ripple 생삭 */
  rippleColor?: ColorsType;
};

// ===== 컴포넌트
function Button({
  children,
  onClick,
  type,
  size = 'm',
  color = 'white',
  backgroundColor = "lime",
  hoverColor = "lime-darken-1",
  disabled,
  rippleColor = 'white',
  border,
  ...args
}: ButtonPropsType) {
  return (
    <Base
      {...{ type, onClick, disabled }}
      {...args}
      component="button"
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      css={[
        styles,
        hoverColor !== undefined ? hoverColorStyle(hoverColor) : undefined,
        !border ? borderNone : undefined,
        sizeStyle[size]
      ]}
    >
      {children}
      {!disabled && <Ripple color={rippleColor} />}
    </Base>
  );
}

// // ===== 기본 props
// Button.defaultProps = {
//   type: 'button',
//   size: 'm',
// }


// ===== export
export default Button;