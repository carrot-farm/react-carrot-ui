/** @jsx jsx */
import { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

// ===== 타입정의
type TSlosh = {
  /** 활성화 유무 */
  disabled?: boolean;
  /** border radius */
  borderRadius?: string;
  /** 흔들림의 민감도 */
  responsiveness?: number;
  /** 그림자의 길이 */
  shadowLength?: number;
  /** 자식 컴포넌트 */
  children: React.ReactNode;
};

// ===== 컴포넌트
/** 눌렀을 경우 흔들림을 준다 */
function Slosh({ 
  disabled, 
  borderRadius,
  responsiveness = 30,
  shadowLength = 10,
  children 
}: TSlosh) {
  const rootEl = useRef<HTMLDivElement>(null);

  // # 마운트
  useEffect(() => {
    if(!disabled) {
      gsap.set(rootEl.current, { 
        transformStyle: "perspective-3d",
        perspective: 1000,
      });
    }
  }, [disabled])

  // 클릭 시 흔들림
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(disabled) {return;}
    // const responsiveness = 30; // 민감도
    // const shadowLength = 10; // 그림자의 길이
    const tl = gsap.timeline();
    const el = e.currentTarget;
    const elInfo = el.getBoundingClientRect();
    const x = e.pageX - elInfo.x - elInfo.width / 2;
    const y = e.pageY - elInfo.y - elInfo.height / 2;
    const xRatio = x / (elInfo.width / 2) * 100;
    const yRatio = y / (elInfo.height / 2) * 100;
    const yMove = (responsiveness * xRatio / 100);
    const xMove = (responsiveness * yRatio / 100) * -1;
    const xShadow = (shadowLength * xRatio / 100) * -1;
    const yShadow = (shadowLength * yRatio / 100) * -1;

    tl.to(rootEl.current, {
      duration: 0.3,
      rotateY: yMove,
      rotateX: xMove,
      boxShadow: `${xShadow}px ${yShadow}px 15px rgba(0, 0, 0, 0.2)`,
      ease: 'power2.out',
    })
    .to(rootEl.current, {
      rotateY: 0,
      rotateX: 0,
      boxShadow: `0px 0px 0px rgba(0,0,0, 0)`,
    })
  };

  return (
    <div css={rootStyle(disabled, borderRadius)} ref={rootEl} onClick={handleClick}>
      {children}
    </div>
  )
}

// ===== style
const rootStyle = (disabled?: boolean, radius?: string) => css`
  position: relative;
  display: inline-block;
  line-height: 0;
  cursor: ${disabled? 'default': 'pointer'};
  background-color: transparent;
  border-radius: ${radius || '0'}
`


export default Slosh;