/** @jsx jsx */
import { useState, useLayoutEffect } from 'react';
import { jsx, css } from '@emotion/core';

import colors from '../../styles/colors'
import { TColorKeys } from '../../types/colors'


// ===== 타입
type RippleType = {
  /** 리플 색상 */
  color?: TColorKeys;
  /** 애니메이션 시간 ms */
  duration?: number;
};

type rippleArrayType = {
  x: number;
  y: number;
  size: number;
}

// ===== 컴포넌트
/** parent의 속성이 `position:relative; overflow: hidden;`을 포함해야 한다. */
function Ripple({ color = 'white', duration = 850 }: RippleType) {
  const [rippleArray, setRippleArray] = useState<rippleArrayType[]>([]);

  // # 생성된 물결을 없앰.
  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  // # 클릭 이벤트
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height
                  ? rippleContainer.width
                  : rippleContainer.height;

    const x = 
      event.pageX - rippleContainer.x - rippleContainer.width / 2;
    const y = 
      event.pageY - rippleContainer.y - rippleContainer.width / 2;
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray((prevState) => [ ...prevState, newRipple]);
  };

  return (
    <div css={[rippleStyle(color, duration)]} onClick={handleClick}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size
              }}
            />
          );
        })}
    </div>
  )
};

// ===== 함수
// # 생성된 물결을 일정 주기로
const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useLayoutEffect(() => {
    let bounce: any = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};


// ===== 스타일
const rippleStyle = (color: TColorKeys, duration: number) =>  css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${colors[color]};
    animation-name: ripple;
    animation-duration: ${duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;



export default Ripple;