/** @jsx jsx */
import { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import Base, { BaseProps } from '../Base/Base';
import { ColorsType } from '../../styles'
import styles, {
  hoverColorStyle,
  sizeStyle,
  borderNone,
  borderRadiusStyle,
  squareStyle,
} from "./ButtonStyles";
import Ripple from '../Ripple/Ripple';

// ===== 타입
export type ButtonPropsType = BaseProps & {
  /** 버튼 타입 */
  type?: 'button' | 'submit';
  /** 버튼 사이즈 */
  size?: 's' | 'm' | 'l';
  /** 마우스 오버시 컬러 */
  hoverColor?: ColorsType;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 라벨 색상 */
  color?: ColorsType;
  /** ripple 생삭 */
  rippleColor?: ColorsType;
  /** 보더 생성 유무 */
  border?: boolean;
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
  type,
  size = 'm',
  color = 'white',
  backgroundColor = "lime",
  hoverColor = "lime-darken-1",
  disabled,
  rippleColor = 'white',
  border,
  borderRadius,
  square,
  children,
  onClick,
  ...args
}: ButtonPropsType) {
  const rootEl = useRef(null);
  const buttonEl = useRef<HTMLButtonElement>(null);
  // const { current: tl } = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    gsap.set(rootEl.current, { perspective: 1000 });
    gsap.set(buttonEl.current, {
      transformStyle: "perspective-3d",
    })
  }, [])

  // # 버튼 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(disabled) {return false;}
    const el = e.currentTarget;
    const elInfo = el.getBoundingClientRect();
    const x = e.pageX - elInfo.x - elInfo.width / 2;
    const y = e.pageY - elInfo.y - elInfo.height / 2;
    const xRatio = x / (elInfo.width / 2) * 100;
    const yRatio = y / (elInfo.height / 2) * 100;
    const yMove = (50 * xRatio / 100);
    const xMove = (50 * yRatio / 100) * -1;
    const xShadow = (10 * xRatio / 100) * -1
    const yShadow = (10 * yRatio / 100) * -1

    tl.to(buttonEl.current, { 
      duration: 0.3,
      rotateY: yMove,
      rotateX: xMove,
      boxShadow: `${xShadow}px ${yShadow}px 15px rgba(0,0,0, 0.2)`,
    })
    .to(buttonEl.current, {
      rotateY: 0,
      rotateX: 0,
      boxShadow: `0px 0px 0px rgba(0,0,0, 0)`,
    })

    // console.log('> ', elInfo, x, y, xRatio, yRatio)
    if(onClick) {
      onClick(e);
    }
  };

  return (
    <div ref={rootEl} style={{position: 'relative'}} css={[rootStyle]}>
      <Base
        {...{ type, onClick: handleClick, disabled }}
        {...args}
        refEl={buttonEl}
        // component="div"
        backgroundColor={backgroundColor}
        color={color}
        border={border}
        css={[
          styles,
          hoverColor !== undefined ? hoverColorStyle(hoverColor) : undefined,
          !border ? borderNone : undefined,
          borderRadius ? borderRadiusStyle(borderRadius) : undefined,
          square ?  squareStyle[size] : undefined,
          sizeStyle[size],
        ]}
      >
        {children}
        {!disabled && <Ripple color={rippleColor} />}
      </Base>
    </div>
  );
}

const tl = gsap.timeline();


// // ===== 기본 props
// Button.defaultProps = {
//   type: 'button',
//   size: 'm',
// }

const rootStyle = css`
  display: inline-block;
`


// ===== export
export default Button;