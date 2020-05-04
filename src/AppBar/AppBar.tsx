/** @jsx jsx */
import { useRef, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import Base, { BaseProps } from '../Base/Base';
import Container from '../Container/Container';
import styles, { flexAlignType } from '../styles';

// ===== 타입
/** props type */
type AppBarPropsType = BaseProps & {
  /** 앱바의 높이 */
  height?: string;
  /** 내부 컨테이너의 최대 넓이 적용 유무 */
  fullWidth?: boolean;
  /** 정렬방식 */
  align?: flexAlignType;
  /** 내부 컴포넌트 */
  children?: React.ReactNode;
};

// ===== 컴포넌트
/** 모바일 상단의 메뉴 등에서 사용 */
function AppBar({
  height = '60px',
  fullWidth,
  align = 'flex-start',
  children,
  ...args
}: AppBarPropsType) {

  return (
    <Base {...args} height={height} css={rootStyle}>
      <Container
        fullWidth={fullWidth}
        css={[containerStyle, styles.flexAlign(align)]}
      >
        {children}
      </Container>
    </Base>
  );
}


// ===== styles
const rootStyle = css`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
const containerStyle = css`
  position: relative;
  display: flex;
`;


// ===== export
export default AppBar;