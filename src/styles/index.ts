import { css } from '@emotion/core';
import colors from './colors';

// ===== 타입
// # 색상 타입
export type ColorsType = keyof typeof colors;
// # 색상 타입을 순회하기 위한 키배열
export const colorTypes: ColorsType[] = Object.keys(colors) as any[];

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

// ===== width
const width = (width: string) => css`width: ${width}`;

// ===== height
const height = (height: string) => css`height: ${height}`;

// ===== background color
const backgroundColor = (color: ColorsType) => css`background-color: ${colors[color]}`;

// ===== color
const color = (color: ColorsType) => css`color: ${colors[color]}`;

export default {
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,

  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,

  width, 
  height,

  backgroundColor, 
  color
}