/** @jsx jsx */
import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import BackLayer from '../BackLayer/BackLayer';

// ===== type
type DrawerType = {
  /** 모달 스위치 */
  sw: boolean;
  /** 모달 보여지는 위치 */
  anchor?: 'left'|'top'|'right'|'bottom';
  /** 컨테이너의 넓이 */
  width?: string;
  /** 컨텐츠 요소 */
  children: React.ReactNode;
  /** 닫힐때 사용하는 핸들러 */
  onClose: () => void;
};
type TAnchorAlign = {
  justifyContent: 'flex-start' | 'center' | 'flex-end';
  alignItems: 'flex-start' | 'center' | 'flex-end';
}
type TAni = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

// ===== component
function Drawer({
  sw = false,
  anchor = 'left',
  children,
  width = '320px',
  onClose,
}: DrawerType) {
  const contentEl = useRef(null);

  // # 앵커에 따른 컨텐츠 위치
  const anchorAlign = useMemo<TAnchorAlign>(() => { 
    const obj: TAnchorAlign = {
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }

    if(anchor === 'right') {
      obj.justifyContent = 'flex-end';
    } else if(anchor === 'top') {
      obj.justifyContent = 'center';
    } else if(anchor === 'bottom') {
      obj.justifyContent = 'center';
      obj.alignItems = 'flex-end';
    }

    return obj;
  }, [anchor]);
  
  // # 보여지기
  const onShow = useCallback(() => {
    const from: TAni = {
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto'
    };
    const to: TAni = {}
    if(anchor === 'left') {
      from.left = '-100%';
      from.top = '0';
      from.bottom = '0';
      to.left = '0%';
    } else if(anchor === 'right') {
      from.right = '-100%';
      from.top = '0';
      from.bottom = '0'
      to.right = '0%';
    } else if(anchor === 'top') {
      from.left = '0';
      from.top = '-100%';
      to.top = '0%';
    } else if(anchor === 'bottom') {
      from.left = '0';
      from.bottom = '-100%';
      to.bottom = '0%';
    }
    // console.log('> ', anchor, from, to)
    gsap.fromTo(contentEl.current, from, to);
  }, [anchor]);
  
  // # 숨기기
  const onHide = useCallback(() => {
    const to: TAni = {};
    if(anchor === 'left') {
      to.left = '-100%';
    } else if(anchor === 'right') {
      to.right = '-100%';
    } else if(anchor === 'top') {
      to.top = '-100%';
    } else if(anchor === 'bottom') {
      to.bottom = '-100%';
    }
    gsap.to(contentEl.current, to);
  }, [anchor])


  // # 애니메이션
  useEffect(() => {
    gsap.set(contentEl.current, {
      css: {
        display: 'block'
      },
    })

  }, [anchor, width]);
  
  return (
    <BackLayer 
      sw={sw} 
      justifyContent={anchorAlign.justifyContent} 
      alignItems={anchorAlign.alignItems}
      onClick={onClose}
      onShow={onShow}
      onHide={onHide}
    >
      <div ref={contentEl} css={contentsStyle(anchor, width)}>
        {children}
      </div>
    </BackLayer>
  );
}

// ===== styles
const contentsStyle = (anchor: 'left' | 'top' | 'right' | 'bottom', width: string) => {
  const base = `
    background-color: #fff;
    position: absolute;
    overflow: auto;
    display: none;
  `;
  if(anchor === 'left') {
    return css`
      ${base}
      width: ${width};
      left: 0;
      top: 0;
      bottom: 0;
    `;
  } else if(anchor === 'right') {
    return css`
      ${base}
      width: ${width};
      right: 0;
      top: 0;
      bottom: 0;
    `;
  } else if(anchor === 'top') {
    return css`
      ${base}
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      max-height: 320px;
    `
  }else if(anchor === 'bottom') {
    return css`
      ${base}
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 320px;
    `
  }
}
// css`
//   background-color: #fff;
//   display: none;
// `;


export default Drawer;