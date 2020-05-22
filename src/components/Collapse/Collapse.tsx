/** @jsx jsx */
import { useCallback, useState, useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import AppBar from '../AppBar/AppBar';
import IconButton from '../IconButton/IconButton';
import Container from '../Container/Container';
import Divider from '../Divider/Divider';

// ===== type
// # props type
type CollapsePropsType = {
  /** 토글 버튼의 상단 테스트 */
  headText?: string;
  /** 헤더의 높이 */
  height?: string;
  /** 첫 렌더링시 컨테츠 노출 여부 */
  show?: boolean;
  /** 컨텐츠 최대넓이 */
  childrenFullWidth?: boolean;
  /** 컨텐츠 */
  children?: React.ReactNode;
  /** 변경 이벤트 */
  onToggle?: (sw: boolean) => void;
};

// ===== component
function Collapse({
  headText,
  height = '50px',
  show = true,
  childrenFullWidth,
  children,
  onToggle,
}: CollapsePropsType) {
  const [sw, setSw] = useState(false);
  const contentsContainerEl = useRef<HTMLDivElement>(null);
  const buttonEl = useRef(null);
  let firstShow = useRef<boolean>(show); // 첫 렌더링 시 컨텐츠 보일지 말지 결정

  useEffect(() => {
    const button = buttonEl.current;
    gsap.set(button, {
      duration: .2,
      rotate: sw ? 180 : 0
    });
  }, [])

  useEffect(() => {
    const el = contentsContainerEl.current;
    const button = buttonEl.current;
    if(sw && firstShow.current === false) {
      firstShow.current = true;
    }
    gsap.to(el, {
      duration: .2,
      height: sw ? 'auto' : 0,
    });
    gsap.to(button, {
      duration: .2,
      rotate: sw ? 180 : 0
    });
  }, [sw]);

  const handleToggle = useCallback(() => {
    console.log('> ', )
    setSw(!sw);
    if(typeof onToggle === 'function') {
      onToggle(sw);
    }
  }, [sw, show]);

  return (
    <div>
      {/* ===== app bar ===== */}
      <AppBar align={'space-between'} height={height}>
        <span>
          {/* headText */}
          {headText && headText}
        </span>

        <div css={buttonSTyle}>
          <div ref={buttonEl} >
            {/* toggle button */}
            <IconButton
              iconName={'angleDownThin'}
              backgroundColor={'transparent'}
              color={'black'}
              rippleColor={'grey'}
              hoverColor={'grey-lighten-5'}
              circleButton={true}
              border={false}
              onClick={handleToggle}
            />
          </div>
        </div>
      </AppBar>
      <Divider />

      {/* ===== contents ===== */}
      <div css={[contentsStyle(firstShow.current)]} ref={contentsContainerEl}>
        <Container fullWidth={childrenFullWidth}>
          {children}
        </Container>
      </div>
    </div>
  )
}


// ===== styles
const contentsStyle = (firstShow: boolean) => css`
  overflow: hidden;
  display: block;
  ${!firstShow ? 'height: 0px' : ''}
`;
const buttonSTyle = css`
  border-radius: 50%;
  overflow: hidden;
  line-height: 0;
`;

// ===== func
const tl = gsap.timeline();

// ===== export
export default Collapse;