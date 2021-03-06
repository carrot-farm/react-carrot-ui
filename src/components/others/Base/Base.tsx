/** @jsx jsx */
import React from "react";
import { jsx, SerializedStyles } from "@emotion/core";
import styles, {
  positionType,
  textAlignType,
  displayType,
  flexAlignType,
  flexDirectionType,
  flexWrapType,
} from "../../../styles";
import { TMainColorKeys, TColorKeys } from "../../../types/colors";

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
export interface BaseProps {
  /** 엘리먼트 참조 */
  refEl?: any;
  /** 내부에 렌더링 될 요소 */
  children?: React.ReactNode;
  /** 클래스명 */
  className?: string;
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
  borderColor?: TColorKeys;

  /** width */
  width?: string;
  /** height */
  height?: string;

  /** background color */
  backgroundColor?: TColorKeys | TMainColorKeys;
  /** color */
  color?: TColorKeys | TMainColorKeys;

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

  /** emotion style */
  css?: SerializedStyles | SerializedStyles[];

  /** 클릭 했을 때 함수 */
  onClick?: (e: React.MouseEvent<HTMLElement>) => any;
  /** 클릭 했을 때 함수 */
  onClickDiv?: (e: React.MouseEvent<HTMLDivElement>) => any;
}

// ===== 컴포넌트
/** 다른 컴포넌트의 토대가 되는 컴포넌트 */
function Base({
  refEl,
  children,
  className,
  component,

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

  css,

  onClick,
  onClickDiv,
  ...args
}: BaseProps) {
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

  // console.log('> ', css)
  // # 컴포넌트 랜더링
  if (component === "span") {
    return (
      <span
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </span>
    );
  } else if (component === "p") {
    return (
      <p
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </p>
    );
  } else if (component === "ul") {
    return (
      <ul
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </ul>
    );
  } else if (component === "li") {
    return (
      <li
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </li>
    );
  } else if (component === "h1") {
    return (
      <h1
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h1>
    );
  } else if (component === "h2") {
    return (
      <h2
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h2>
    );
  } else if (component === "h3") {
    return (
      <h3
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h3>
    );
  } else if (component === "h4") {
    return (
      <h4
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h4>
    );
  } else if (component === "h5") {
    return (
      <h5
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h5>
    );
  } else if (component === "h6") {
    return (
      <h6
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </h6>
    );
  } else if (component === "button") {
    return (
      <button
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (component === "table") {
    return (
      <table
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </table>
    );
  } else if (component === "i") {
    return (
      <i
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </i>
    );
  } else if (component === "article") {
    return (
      <article
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        onClick={onClick}
      >
        {children}
      </article>
    );
  } else if (component === "section") {
    return (
      <section
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        onClick={onClick}
      >
        {children}
      </section>
    );
  } else if (component === "a") {
    return (
      <a
        {...args}
        css={[cssCreator(styleProps, styles), css]}
        className={className}
        ref={refEl}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      {...args}
      css={[cssCreator(styleProps, styles), css]}
      className={className}
      ref={refEl}
      onClick={onClickDiv}
    >
      {children}
    </div>
  );
}

// ===== 기본 props 설정
Base.defaultProps = {
  component: "div",
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
  for (const a in props) {
    if (props[a] !== undefined && styles[a] && props[a] !== false) {
      // console.log('> ', a, props[a]);
      result[i++] = styles[a](props[a]);
    }
  }
  return result;
};

export default Base;
