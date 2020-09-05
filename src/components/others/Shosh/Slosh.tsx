/** @jsx jsx */
import { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

// ===== 타입정의
interface TSlosh {
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
  responsiveness = 25,
  shadowLength = 10,
  children,
  ...args
}: TSlosh) {
  const rootEl = useRef<HTMLDivElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);

  // # 마운트
  useEffect(() => {
    gsap.set(rootEl.current, { 
      perspective: 500,
    });
    gsap.set(containerEl.current, {
      transformStyle: "perspective-3d",
    })
  }, [])

  // 클릭 시 흔들림
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // # 비활성화나 input에서 엔터키를 이용해 이벤트가 발생시 차단
    if(disabled 
      || (e.nativeEvent.clientX === 0 && e.nativeEvent.clientY === 0)
    ) {return;}

    const el = e.currentTarget;
    const elInfo = el.getBoundingClientRect();
    const x = e.pageX - window.scrollX - elInfo.x - elInfo.width / 2;
    const y = e.pageY - window.scrollY - elInfo.y - elInfo.height / 2;
    const xRatio = x / (elInfo.width / 2) * 100;
    const yRatio = y / (elInfo.height / 2) * 100;
    const yMove = xRatio * responsiveness / 100;
    const xMove = (yRatio * responsiveness / 100) * -1;
    const xShadow = (shadowLength * xRatio / 100) * -1;
    const yShadow = (shadowLength * yRatio / 100) * -1;

    // console.log('> run slosh', e.pageX, e.pageY, e.nativeEvent.clientX)
    // console.log('> ', y, yRatio, xMove )
    // console.log('> ', window.scrollY, y, e.pageY, elInfo.y )

    gsap.to(containerEl.current, {
      duration: 0.3,
      rotateX: xMove,
      rotateY: yMove,
      boxShadow: `${xShadow}px ${yShadow}px 15px rgba(0, 0, 0, 0.2)`,
      ease: 'power2.out',
    })
    gsap.to(containerEl.current, {
      delay: 0.3,
      rotateY: 0,
      rotateX: 0,
      boxShadow: `0px 0px 0px rgba(0,0,0, 0)`,
    })

  };

  return (
    <div {...args} css={rootStyle()} ref={rootEl} onClick={handleClick}>
      <div ref={containerEl} css={containerStyle(disabled, borderRadius)}>
        {children}
      </div>
    </div>
  )
}

// ===== style
const containerStyle = (disabled?: boolean, radius?: string) => css`
  position: relative;
  display: inline-block;
  line-height: 0;
  cursor: ${disabled? 'default': 'pointer'};
  background-color: transparent;
  border-radius: ${radius || '0'};
  width: inherit;
`
const rootStyle = () => css`
  position: relative;
  width: inherit;
`


export default Slosh;