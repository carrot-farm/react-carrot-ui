/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import Base, { BaseProps } from '../Base/Base';
import styles from '../styles';
const { media } = styles;

// ===== 타입
type GridTPropsType = BaseProps & {
  /** row / col 여부 확인 */
  row?: boolean,
  /** Grid 간격 */
  spacing?: number, // 
  /** 기본적용되는 넓이 Grid system */
  xs?: number, // 
  /** mobile 넓이 Grid system */
  s?: number,
  /** table 넓이 Grid system */
  m?: number,
  /** pc 넓이 Grid system */
  l?: number, // pc
  /** 모바일에서 적용되는 offset */
  offsetS?: number, // offset-s
  /** tablet에서 적용되는 offset */
  offsetM?: number, // offset-m
  /** pc에서 적용되는 offset */
  offsetL?: number, // offset-m
  /** 자식요소 */ 
  children?: React.ReactNode,
};

// ===== 컴포넌트
function Grid({
  row,
  spacing = 0,
  xs,
  s,
  m,
  l,
  offsetS,
  offsetM,
  offsetL,
  children,
  ...args
}: GridTPropsType) {
    

  return (
    <Base
      {...args}
      css={[
        row ? rowStyle(spacing) : undefined,
        xs ? xsCol(xs) : undefined,
        s ? sCol(s) : undefined,
        m ? mCol(m) : undefined,
        l ? lCol(l) : undefined,
        offsetS ? offsetSCol(offsetS, 's') : undefined,
        offsetM ? offsetSCol(offsetM, 'm') : undefined,
        offsetL ? offsetSCol(offsetL, 'l') : undefined,
      ]}
    >
      {children}
    </Base>
  );
}



// ===== 스타일
const spacingUnit = 5;
const colCreate = (col: number) => Math.floor(col / 12 * 100)
const rowStyle = (spacing: number) =>  css`
  display: flex;
  flex-wrap: wrap;
  ${spacing ? `margin: -${spacing * spacingUnit}px;` : ''}
  & > div, & > span, & > li, & > a {
    ${spacing ? `padding: ${spacing * spacingUnit}px;`: ''}
  }
`;

// # column
const xsCol = (col: number) => css`
  width: ${colCreate(col)}%;
`;
const sCol = (col: number) => media.s(`
  width: ${colCreate(col)}%;
`);
const mCol = (col: number) => media.m(`
  width: ${colCreate(col)}%;
`);
const lCol = (col: number) => media.l(`
  width: ${colCreate(col)}%;
`);

// # offset
const offsetSCol = (col: number, breakPoint: string) =>
  media[breakPoint](`
    margin-left: ${colCreate(col)}%;
  `);


// ===== export
export default Grid;