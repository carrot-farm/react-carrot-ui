/** @jsx jsx */
import { useRef } from 'react';
import { jsx, css } from '@emotion/core';

import Slosh from '../Shosh/Slosh';
import styles, {
  hoverColorStyle,
  sizeStyle,
  borderNone,
  borderRadiusStyle,
  disabledStyle,
  squareStyle,
  buttonStyle,
  rootStyle,
  backgroundColorStyle,
  borderStyle,
  borderColorStyle,
  containerStyle,
} from "./ButtonStyles";
import Ripple from '../Ripple/Ripple';
import ThemeContext from '../../theme';
import { TMainColorKeys, TColorKeys } from '../../types/colors';



// ===== 타입
export type TButtonProps = {
  /** buttonCreator에서 구분을 위함. */
  name?: string;
  /** 버튼 타입 */
  type?: 'button' | 'submit';
  /** 버튼 사이즈 */
  size?: 's' | 'm' | 'l';
  /** 배경 색상 */
  backgroundColor?: TMainColorKeys;
  /** 마우스 오버시 컬러 */
  hoverColor?: TColorKeys;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 라벨 색상 */
  color?: TColorKeys;
  /** ripple 생삭 */
  rippleColor?: TColorKeys;
  /** 보더 생성 유무 */
  border?: boolean;
  /** 보더 생성 유무 */
  borderColor?: TColorKeys;
  /** 모서리 둥글기 */
  borderRadius?: string;
  /** 정사각형 */
  square?: boolean;
  /** 꽉차는 크기의 버튼 */
  fullWidth?: boolean;
  /** 내부 컴포넌트 */
  children: React.ReactNode;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

// ===== 컴포넌트
function Button({
  name,
  type = 'button',
  size = 'm',
  color,
  backgroundColor,
  hoverColor,
  disabled,
  rippleColor,
  border,
  borderColor,
  borderRadius,
  square,
  fullWidth,
  children,
  onClick,
  ...args
}: TButtonProps) {
  const rootEl = useRef(null);
  // console.log('> ', onClick)
  // const buttonEl = useRef<HTMLButtonElement>(null);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _backgroundColor = backgroundColor || theme.primaryColor!;
        const _hoverColor = hoverColor || theme.primaryDarkenColor as TColorKeys;
        const _color = color || theme.primaryTextColor as TColorKeys;
        const _rippleColor = rippleColor || theme.primaryRippleColor as TColorKeys;
        const _borderColor = borderColor || theme.primaryColor!;
        
        // console.log('> ', _rippleColor)

        return (
          <div className="carrot-ui-button-root" ref={rootEl} css={[rootStyle, fullWidth && fullWidthStyle]}>
            <Slosh disabled={disabled} borderRadius={borderRadius}>
              <div css={[containerStyle]}>
                
                <button
                  {...args}
                  name={name}
                  type={type}
                  disabled={disabled}
                  css={[
                    hoverColorStyle(_hoverColor),
                    styles,
                    !border ? borderNone : undefined,
                    borderRadius ? borderRadiusStyle(borderRadius) : undefined,
                    disabled ? disabledStyle(disabled) : undefined,
                    square ? squareStyle[size] : undefined,
                    sizeStyle[size],
                    buttonStyle(_color, disabled),
                    backgroundColorStyle(_backgroundColor),
                    border ? borderStyle(border) : undefined,
                    border ? borderColorStyle(_borderColor) : undefined,
                  ]}
                  onClick={onClick}
                >
                  <span>{children}</span>
                  {!disabled && <Ripple color={_rippleColor} />}
                </button>
                
              </div>
            </Slosh>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  );
}

const fullWidthStyle = css`
  width: 100%;
  & > div, button {
    width: 100%;
  }
`;

// ===== export
export default Button;

