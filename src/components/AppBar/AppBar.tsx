/** @jsx jsx */
import { useRef, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import Base, { BaseProps } from '../Base/Base';
import Container from '../Container/Container';
import styles, { flexAlignType } from '../../styles';
import { TColorKeys } from '../../types/colors'

// ===== 타입
/** props type */
type AppBarPropsType = BaseProps & {
  /** 앱바의 높이 */
  height?: string;
  /** 내부 컨테이너의 최대 넓이 적용 유무 */
  fullWidth?: boolean;
  /** 정렬방식 */
  align?: flexAlignType;
  /** 배경색 */
  backgroundColor?: TColorKeys;
  /** 내부 컴포넌트 */
  children?: React.ReactNode;
};

// ===== 컴포넌트
/** 모바일 상단의 메뉴 등에서 사용 */
function AppBar({
  height = '60px',
  fullWidth,
  align = 'flex-start',
  backgroundColor = 'white',
  children,
  ...args
}: AppBarPropsType) {

  return (
    <Base
      {...args}
      height={height}
      css={rootStyle}
      backgroundColor={backgroundColor}
    >
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
  display: flex;
  align-items: center;
  `;
const containerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
`;


// ===== export
export default AppBar;