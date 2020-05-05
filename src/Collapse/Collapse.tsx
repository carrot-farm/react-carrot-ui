/** @jsx jsx */
import { useCallback, useState, useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import styles, { ColorsType } from '../styles';
import AppBar from '../AppBar/AppBar';
import IconButton from '../IconButton/IconButton';
import Container from '../Container/Container';
import Divider from '../Divider/Divider';
import { button } from '../_Button/Button.stories_';

// ===== type
// # props type
type CollapsePropsType = {
  /** 토글 버튼의 상단 테스트 */
  headText?: string;
  /** 헤더의 높이 */
  height?: string;
  /** 첫 렌더링시 컨테츠 노출 여부 */
  show?: boolean;
  /** 컨텐츠 */
  children?: React.ReactNode;
  /** 변경 이벤트 */
  onToggle?: (sw: boolean) => void;
};

// ===== component
function Collapse({
  headText,
  height = '50px',
  show = false,
  children,
  onToggle,
}: CollapsePropsType) {
  const [sw, setSw] = useState(show);
  const contentsContainerEl = useRef<HTMLDivElement>(null);
  const buttonEl = useRef(null);
  let firstShow = useRef<boolean>(show); // 첫 렌더링 시 컨텐츠 보일지 말지 결정

  useEffect(() => {
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
    setSw(!sw);
    if(typeof onToggle === 'function') {
      onToggle(sw);
    }
  }, [sw]);

  return (
    <div>
      {/* ===== app bar ===== */}
      <AppBar align={'space-between'} height={height}>
        <span>
          {/* headText */}
          {headText && headText}
        </span>

        <div ref={buttonEl}>
          {/* toggle button */}
          <IconButton
            iconName={'angleDownThin'}
            circleButton={true}
            border={false}
            onClick={handleToggle}
          />
        </div>
      </AppBar>
      <Divider />

      {/* ===== contents ===== */}
      <div css={[contentsStyle(firstShow.current)]} ref={contentsContainerEl}>
        <Container>
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

// ===== func
const tl = gsap.timeline();

// ===== export
export default Collapse;