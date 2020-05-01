/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styles, {
  ColorsType,
  positionType,
  textAlignType,
  displayType,
  flexAlignType,
  flexDirectionType,
  flexWrapType,
} from "../styles";

// ===== 타입 정의
// # componrntType
export const ComponentValues = [
         "div",
         "span",
         "p",
         "ul",
         "li",
         "h1",
         "h2",
         "h3",
         "h4",
         "h5",
         "h6",
         "button",
         "table",
         "i",
         "article",
         "section",
         "a",
       ] as const;
export type ComponentType = typeof ComponentValues[number];
// # props
export type BaseProps = {
  /** 내부에 렌더링 될 요소 */
  children: React.ReactNode,
  /** 생성될 HTML 엘리먼트명 */
  component?: ComponentType;

  /** margin top */
  marginTop?: number;
  /** margin right */
  marginRight?: number;
  /** margin bottom */
  marginBottom?: number;
  /** margin left */
  marginLeft?: number;

  /** padding top */
  paddingTop?: number;
  /** padding right */
  paddingRight?: number;
  /** padding bottom */
  paddingBottom?: number;
  /** padding left */
  paddingLeft?: number;

  /** 전체 border */
  border?: boolean;
  /** 상단 보더 */
  borderTop?: boolean;
  /** 오른쪽 보더 */
  borderRight?: boolean;
  /** 하단 보더 */
  borderBottom?: boolean;
  /** 왼쪽 보더 */
  borderLeft?: boolean;
  /** 보더 색상 */
  borderColor?: ColorsType;

  /** width */
  width?: string;
  /** height */
  height?: string;

  /** background color */
  backgroundColor?: ColorsType;
  /** color */
  color?: ColorsType;

  /** position */
  position?: positionType;
  /** display */
  display?: displayType;
  /** textAlign */
  textAlign?: textAlignType;
  /** flexAlign */
  flexAlign?: flexAlignType;
  /** flexAlign */
  flexWrap?: flexWrapType;
  /** flexAlign */
  flexDirection?: flexDirectionType;
};

// ===== 컴포넌트
/** 다른 컴포넌트의 토대가 되는 컴포넌트 */
function Base(props: BaseProps) {
  const {
    component,
    children,
  
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
  
    width,
    height,
  
    backgroundColor,
    color,
  
    position,
    display,
    textAlign,
    flexAlign,
    flexWrap,
    flexDirection,
  
    ...args
  } = props;
  const styleProps = {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,

    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,

    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,

    width,
    height,

    backgroundColor,
    color,

    position,
    display,
    textAlign,
    flexAlign,
    flexWrap,
    flexDirection,
  };

  // console.log('> ', styleProps.border)
  // # 컴포넌트 랜더링
  if (component === "span") {
    <span {...args} css={cssCreator(styleProps, styles)} >{children}</span>;
  } else if(component === 'p') {
    <p {...args} css={cssCreator(styleProps, styles)} >{children}</p>;
  } else if(component === 'ul') {
    <ul {...args} css={cssCreator(styleProps, styles)} >{children}</ul>;
  } else if(component === 'li') {
    <li {...args} css={cssCreator(styleProps, styles)} >{children}</li>;
  } else if(component === 'h1') {
    <h1 {...args} css={cssCreator(styleProps, styles)} >{children}</h1>;
  } else if(component === 'h2') {
    <h2 {...args} css={cssCreator(styleProps, styles)} >{children}</h2>;
  } else if(component === 'h3') {
    <h3 {...args} css={cssCreator(styleProps, styles)} >{children}</h3>;
  } else if(component === 'h4') {
    <h4 {...args} css={cssCreator(styleProps, styles)} >{children}</h4>;
  } else if(component === 'h5') {
    <h5 {...args} css={cssCreator(styleProps, styles)} >{children}</h5>;
  } else if(component === 'h6') {
    <h6 {...args} css={cssCreator(styleProps, styles)} >{children}</h6>;
  } else if(component === 'button') {
    <button {...args} css={cssCreator(styleProps, styles)} >{children}</button>;
  } else if(component === 'table') {
    <table {...args} css={cssCreator(styleProps, styles)} >{children}</table>;
  } else if(component === 'i') {
    <i {...args} css={cssCreator(styleProps, styles)} >{children}</i>;
  } else if(component === 'article') {
    <article {...args} css={cssCreator(styleProps, styles)} >{children}</article>;
  } else if(component === 'section') {
    <section {...args} css={cssCreator(styleProps, styles)} >{children}</section>;
  } else if(component === 'a') {
    <a {...args} css={cssCreator(styleProps, styles)} >{children}</a>;
  }

  return <div {...args} css={cssCreator(styleProps, styles)} >{children}</div>;
}

// ===== 기본 props 설정
Base.defaultProps = {
  component: 'div',
  border: false,
  borderTop: false,
  borderRight: false,
  borderBottom: false,
  borderLeft: false,
};

// ===== 함수
// # props를 판단해서 이모션 css 배열로 반환
const cssCreator = (props: any, styles: any) => {
  const result = [];
  let i = 0;
  for(const a in props) {
    // console.log('> ', a, props[a]);
    if(a !== undefined && styles[a] && props[a] !== false) {
      result[i++] = styles[a](props[a]);
    }
  }
  return result;
}


export default Base;