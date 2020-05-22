/** @jsx jsx */
import { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import Base, { BaseProps } from '../Base/Base';
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
import { getColor } from '../../styles';
import ThemeContext, { themes } from '../../theme';
import { TMainColorKeys, TColorKeys } from '../../types/colors';



// ===== 타입
export type ButtonPropsType = {
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
  /** 내부 컴포넌트 */
  children: React.ReactNode;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

// ===== 컴포넌트
function Button({
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
  children,
  onClick,
  ...args
}: ButtonPropsType) {
  const rootEl = useRef(null);
  // console.log('> ', args)
  // const buttonEl = useRef<HTMLButtonElement>(null);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _backgroundColor = backgroundColor || theme.primaryColor!;
        const _hoverColor = hoverColor || theme.primaryDarkenColor as TColorKeys;
        const _color = color || theme.primaryTextColor as TColorKeys;
        const _rippleColor = rippleColor || theme.primaryRippleColor as TColorKeys;
        const _borderColor = borderColor || theme.primaryColor!;
        
        return (
          <div ref={rootEl} css={[rootStyle]}>
            {/* Slosh */}
            {/* <Base
              refEl={buttonEl}
              component="div"
              backgroundColor={_backgroundColor}
              border={border}
              borderColor={borderColor}
              css={[
                styles,
                hoverColorStyle(_hoverColor),
                !border ? borderNone : undefined,
                borderRadius ? borderRadiusStyle(borderRadius) : undefined,
                disabled ? disabledStyle(disabled) : undefined,
                square ? squareStyle[size] : undefined,
                sizeStyle[size],
              ]}
              onClickDiv={handleClick}
            >
              <button
                {...args}
                type={type}
                disabled={disabled}
                css={[buttonStyle(_color, disabled)]}
              >
                {children}
              </button>
              {!disabled && <Ripple color={_rippleColor} />}
            </Base> */}




            {/* <Base
              refEl={buttonEl}
              component="div"
              
              css={[
                styles,
                hoverColorStyle(_hoverColor),
                !border ? borderNone : undefined,
                borderRadius ? borderRadiusStyle(borderRadius) : undefined,
                disabled ? disabledStyle(disabled) : undefined,
                square ? squareStyle[size] : undefined,
                sizeStyle[size],
              ]}
              onClickDiv={handleClick}
            > */}
            <Slosh disabled={disabled} borderRadius={borderRadius}>
              <div css={containerStyle}>
                <button
                  {...args}
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
                  {children}
                </button>
                {!disabled && <Ripple color={_rippleColor} />}
              </div>
            </Slosh>
            {/* </Base> */}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  );
}

// ===== export
export default Button;

