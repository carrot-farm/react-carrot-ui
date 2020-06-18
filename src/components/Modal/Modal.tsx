/** @jsx jsx */
import React, { useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

// ===== type
type ModalType = {
  /** 모달 스위치 */
  sw: boolean;
  /** 컨텐츠 요소 */
  children: React.ReactNode;
  /** 컨테이너의 넓이 */
  width?: string;
  /** show 애니메이션 후 콜백 함수 */
  onShowCompleted?: () => void;
  /** hide 애니메인션 후 콜백 함수 */
  onHideCompleted?: () => void;
  /** 닫힐때 사용하는 핸들러 */
  onClose: () => void;
};

// ===== component
function Modal({
  width = '400px',
  sw = false,
  children,
  onShowCompleted,
  onHideCompleted,
  onClose,
}: ModalType) {
  const rootEl = useRef(null);
  const backdropEl = useRef(null);
  const contentEl = useRef(null);
  const { current: tl } = useRef(gsap.timeline({ paused: true }));
  
  useEffect(() => {
    // # timeline 셋팅
    tl.set(rootEl.current, { perspective: 1000 });
    tl.set(contentEl.current, {
      rotateX: 60,
      autoAlpha: 0,
      transformStyle: "perspective-3d",
      transformOrigin: "center top",
      onComplete: () => {
        onShowCompleted && onShowCompleted();
      },
      onReverseComplete: () => {
        onHideCompleted && onHideCompleted();
      }
    });

    tl
    .to(rootEl.current, {css: { display: 'block' }}, '-=0.5')
    .fromTo(
      backdropEl.current,
      { autoAlpha: 0, css: { display: "flex" } },
      { duration: 0.2, autoAlpha: 1 }
    ).fromTo(
      contentEl.current,
      {
        autoAlpha: 0,
        css: { display: "block" },
      },
      {
        duration: 0.3,
        autoAlpha: 1,
        rotateX: 0,
      },
    );
    // console.log('> tl', tl)
    return () => {
      onClose();
    }
  }, [])

  // console.log('> ', tl)
  useEffect(() => {
    if(sw) {
      tl.play()
    } else {
      tl.reverse()
    }
  }, [sw]);

  return (
    <div className={`react-carrot-ui_modal-root `} css={[style]} ref={rootEl}>
      <div
        className={`react-carrot-ui_modal-backdrop `}
        css={[backdropStyle]}
        onClick={onClose}
        ref={backdropEl}
      ></div>
      <div
        className={`react-carrot-ui_modal-content `}
        css={[contentStyle(width)]}
        ref={contentEl}
      >
        {children}
      </div>
    </div>
  );
}



// ===== styles
const style = css`
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  display: none;
`;
const backdropStyle = css`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: none;
`;
const contentStyle = (width: string) => css`
  padding: 16px 20px 24px;
  margin: auto;
  margin-top: 80px;
  min-width: 200px;
  width: ${width};
  max-width: 90%;
  background-color: #fff;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12);
  opacity: 0;
`;


export default React.memo(Modal);