/** @jsx jsx */
import ReactDOM from 'react-dom';
import React, { useRef, useCallback, useEffect } from 'react';
import { jsx, css, Global } from '@emotion/core';
import gsap from 'gsap';

// ===== type
// # 함수의 파라메터 타입
type TEventParams = {
  rootEl: React.RefObject<HTMLDivElement>;
  backdropEl: React.RefObject<HTMLDivElement>;
}
// # 컴포넌트 타입
type TBackLayer = {
  /** 모달 스위치 */
  sw: boolean;
  /** contents 정렬. alignItmes */
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  /** contents 정렬. justifyContent */
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
  /** 컨텐츠 요소 */
  children: React.ReactNode;
  /** 애니메이션 시작시 */
  onShow?: ({rootEl, backdropEl}: TEventParams) => any,
  /** 시작 애니메이션 완료시 */
  onComplete?: ({rootEl, backdropEl}: TEventParams) => any,
  /** 종료시 */
  onHide?: ({rootEl, backdropEl}: TEventParams) => any,
  /** 종료 애니메이션 완료시 */
  onHideComplete?: ({rootEl, backdropEl}: TEventParams) => any,
  /** back layer click 시 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => any;
};


// ===== component
/** modal, drawer등에 사용되는 배경 */
function BackLayer({
  sw = false,
  alignItems = 'flex-start',
  justifyContent = 'center',
  children,
  onShow,
  onComplete,
  onHide,
  onHideComplete,
  onClick,
}: TBackLayer) {
  const rootEl = useRef<HTMLDivElement>(document.createElement('div'));
  // const rootEl = useRef<HTMLDivElement>(null); // 최상단 엘리먼트
  const backdropEl = useRef<HTMLDivElement>(null); // 백 레이어 엘리먼트
  const contentEl = useRef<HTMLDivElement>(null); // 컨텐츠 엘리먼트
  const { current: tl } = useRef(gsap.timeline({ paused: true }));
  
  // # 마운드
  useEffect(() => {
    // # el을 body에 append
    rootEl.current.style.position = 'fixed';
    rootEl.current.style.zIndex = '1000';
    rootEl.current.style.top = '0';
    rootEl.current.style.right = '0';
    rootEl.current.style.bottom = '0';
    rootEl.current.style.left = '0';
    rootEl.current.style.overflow = 'hidden';
    rootEl.current.style.display = 'none';

    document.querySelector('body')?.appendChild(rootEl.current);

    // # timeline 셋팅
    tl.clear()
    .set(rootEl.current, { 
      perspective: 1000, 
      onReverseComplete: () => {
        if(typeof onHideComplete === 'function') {
          onHideComplete({ rootEl, backdropEl })
        }
      }
    });
    tl.set(backdropEl.current, {
      css: { display: "flex" } 
    })

    // # 애니메이션
    tl
    .to(rootEl.current, {
      css: { 
        display: 'flex',
      }
    })
    .fromTo(  
      backdropEl.current,
      { autoAlpha: 0, },
      { 
        duration: 0.2, 
        autoAlpha: 1,
        onStart: () => {
          if(typeof onShow === 'function') { onShow({ rootEl, backdropEl }); }
        },
        onComplete: () => {
          if(typeof onComplete === 'function') { onComplete({ rootEl, backdropEl }); }
        },
      }
    );

    // console.log('> tl', tl)
    return () => {
      // # el 삭제
      document.querySelector('body')?.removeChild(rootEl.current);
    }
  }, [onShow, onComplete, onHide, onHideComplete]);

  // # 정렬
  useEffect(() => {
    rootEl.current.style.alignItems = alignItems;
    rootEl.current.style.justifyContent = justifyContent;
  }, [alignItems, justifyContent])



  // # sw치에 따른 액션
  useEffect(() => {
    if(sw) {
      tl.play();
    } else {
      if(typeof onHide === 'function') {
        onHide({ rootEl, backdropEl })
      }
      tl.reverse();
    }
  }, [sw, onHide])


  return (
    ReactDOM.createPortal(
      <React.Fragment>
        {/* 전역 스타일 설정 */}
        {sw && 
          <Global
            styles={globalStyle}
          />
        }

        {/* 배경 */}
        <div
          className={`react-carrot-ui_modal-backdrop `}
          css={[backdropStyle]}
          onClick={onClick}
          ref={backdropEl}
        ></div>

        {/* 컨텐트 */}
        <div
          className={`react-carrot-ui_modal-content `}
          css={contentsStyle}
          ref={contentEl}
        >
          {children}
        </div>
      </React.Fragment>
      , 
      rootEl.current
    )
  );
}

// ===== styles
// # 전역 스타일
const globalStyle = css`
  body {
    padding-right: 17px;
    overflow: hidden;
  }
`;
// # 백 레이어 스타일
const backdropStyle = css`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: none;
`;
// # 컨텐츠 스타일
const contentsStyle = css`
  z-index: 1;
  top:0;
  left:0;
`;


export default BackLayer;