import { css } from '@emotion/core';
import colors, { mainColors } from './colors';
import { TMainColorKeys, TColorKeys } from '../types/colors'

// ===== 타입
// # 색상 타입을 순회하기 위한 키배열
export const colorTypes: TColorKeys[] = Object.keys(colors) as any[];
// # 메인 색상의 배열
export const mainColorsArr: TMainColorKeys[] = Object.keys(mainColors) as any[];
// # position Type
export const positionValues = ["relative", "absolute", "fixed", "static", "sticky"] as const;
export type positionType = typeof positionValues[number];
// # text align type
export const textAlignValues = ["left", "center", "right"] as const;
export type textAlignType = typeof textAlignValues[number];
// # display type
export const displayValues = ["inline", "inline-block", "block", "flex", "inline-flex", "none"] as const;
export type displayType = typeof displayValues[number];
// # flext align type
export const flexAlignValues = ["space-around", "space-between", "flex-start","flex-end", "middle-center", "middle", "center"] as const; 
export type flexAlignType = typeof flexAlignValues[number];
// # flex wrap
export const flexWrapValues = ["wrap", "nowrap"];
export type flexWrapType = typeof flexWrapValues[number];
// # flex direction
export const flexDirectionValues = ["row", "column"] as const
export type flexDirectionType = typeof flexDirectionValues[number];

// ===== 기본 값
export const baseUnit = 5;

// ===== margin
const marginTop = (number: number) => css`margin-top: ${number * baseUnit}px;`;
const marginRight = (number: number) => css`margin-right: ${number * baseUnit}px;`;
const marginBottom = (number: number) => css`margin-bottom: ${number * baseUnit}px;`;
const marginLeft = (number: number) => css`margin-left: ${number * baseUnit}px;`;

// ===== padding
const paddingTop = (number: number) => css`padding-top: ${number * baseUnit}px;`;
const paddingRight = (number: number) => css`padding-right: ${number * baseUnit}px;`;
const paddingBottom = (number: number) => css`padding-bottom: ${number * baseUnit}px;`;
const paddingLeft = (number: number) => css`padding-left: ${number * baseUnit}px;`;

// ===== border
const border = () => css`
  box-sizing: border-box;
  border: 1px solid;
`;
const borderTop = () => css`
  box-sizing: border-box;
  border-top: 1px solid;
`;
const borderRight = () => css`
  box-sizing: border-box;
  border-right: 1px solid;
`;
const borderBottom = () => css`
  box-sizing: border-box;
  border-bottom: 1px solid;
`;
const borderLeft = () => css`
  box-sizing: border-box;
  border-left: 1px solid;
`;
const borderColor = (color: TColorKeys) => css`border-color: ${colors[color]}`;

// ===== width
const width = (width: string) => css`width: ${width}`;

// ===== height
const height = (height: string) => css`height: ${height}`;

// ===== background color
const backgroundColor = (color: TColorKeys) => css`background-color: ${colors[color]}`;

// ===== color
const color = (color: TColorKeys) => css`color: ${colors[color]}`;



// ===== position
const position = (position: positionType) => css`position: ${position}`;

// ===== display
const display = (display: displayType) => css`display: ${display}`;

// ===== text align
const textAlign = (align: textAlignType) => css`text-align: ${align}`;

// ===== flex align
const flexAlign = (align: flexAlignType) => {
  if(align === 'center')  {
    return (css`justify-content: center`) ;
  } else if(align === 'middle') {
    return (css`align-items: center`) ;
  } else if(align === 'middle-center') {
    return (css`
      justify-content: center;
      align-items: center;
    `);
  } else if(align === 'flex-start') {
    return css`justify-content: flex-start;`;
  } else if(align === 'flex-end') {
    return css`justify-content: flex-end;`;
  } else if (align === "space-around") {
    return css`justify-content: space-around;`; 
  } else if (align === "space-between") {
    return css`justify-content: space-between;`; 
  }
};
// ===== flex wrap
const flexWrap = (wrap: flexWrapType) => css`flex-wrap: ${wrap}`;
// ===== flex wrap
const flexDirection = (direction: flexDirectionType) => css`flex-direction: ${direction}`;

// ===== media query
const media: any = {
  s: (styles: string) => {
    return css`
      @media screen and (max-width: 600px) {
        ${styles}
      }
    `;
  },
  m: (styles: string) => { 
    return (
      css`
      @media screen and (min-width: 601px) and (max-width: 960px) {
        ${styles}
      }`
    )
  },
  l: (styles: string) => {
    return (css`
      @media screen and (min-width: 961px) {
        ${styles}
      }
    `)
  },
}



// ===== 컬럭의 색상을 반환
export const getColor = (color: keyof typeof colors) => colors[color];

// ===== export
export default {
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

  color,
  backgroundColor, 

  position,
  display,
  textAlign,
  flexAlign,
  flexWrap,
  flexDirection,

  media,
  getColor,
}
