/** @jsx jsx */
import { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';


// ===== type
// # props type
type FoldingPropsType = {
  /** 토글 스위치 */
  sw?: boolean;
  /** absolute를 이용해 떠있게 */
  float?: boolean;
  /** 컨텐츠 */
  children?: React.ReactNode;
};

// ===== component
function Folding({
  sw = false,
  float,
  children,
}: FoldingPropsType) {
  const contentsContainerEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(contentsContainerEl.current, {
      height: sw ? 'auto' : 0
    })
  }, []);

  useEffect(() => {
    toggleHeight(sw, contentsContainerEl.current);
  }, [sw]);

  return (
    <div css={[contentsStyle()]} className={`${float?'float':''}`} ref={contentsContainerEl}>
      {children}
    </div>
  )
}

// ==== func
const toggleHeight = (sw: boolean, el: HTMLElement | null) => {
  gsap.to(el, {
    duration: .2,
    height: sw ? 'auto' : 0,
  });
}


// ===== styles
const contentsStyle = () => css`
  overflow: hidden;
  display: block;
  height: 0;
  &.float {
    box-shadow: 3px 6px 15px rgba(0, 0, 0, .15);
    width: 100%;
    position: absolute;
    top: 0;
    left:0;
  }
`;

// ===== export
export default Folding;