/** @jsx jsx */
import { jsx } from '@emotion/core';
import styles, { ColorsType } from '../styles';

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
  /** 내부에 렌더링 될 컴포넌트 */
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
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderColor?: ColorsType;

  /** width */
  width?: string;
  /** height */
  height?: string;

  /** background color */
  backgroundColor?: ColorsType;
  /** color */
  color?: ColorsType;
};

// ===== 컴포넌트
/** 다른 컴포넌트의 토대가 되는 컴포넌트 */
function Base(props: BaseProps) {
  const {
    component,
    children,
    ...args
  } = props;

  const otherProps = otherPropsFilter(args, styles);

  // console.log('> ', otherProps)
  // # 컴포넌트 랜더링
  if (component === "div") {
    return <div {...otherProps} css={cssCreator(props, styles)} >{children}</div>;
  }
}

// ===== 기본 props 설정
Base.defaultProps = {
  component: 'div'
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
// # 스타일링에 사용될 props를 제외한 props
const otherPropsFilter = (props: any, styles: any) => {
  const result: any = {} ;
  for(const a in props) {
    if(!styles[a]) {
      result[a] = props[a];
    }
  }
  return result;
}


export default Base;