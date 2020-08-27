/** @jsx jsx */
import React, { useMemo } from "react";
import { jsx, css } from "@emotion/core";

// ===== 타입
export interface TAlign {
  /** 정렬 방향 */
  direction?: "horizontal" | "vertical";
  /** 자식들간의 간격 */
  space?: number;
  /** justify-content 속성 */
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  /** align-items 속성 */
  align?: "flex-start" | "center" | "flex-end";
  /** 자식 컴포넌트 */
  children?: React.ReactNode;
}

// ===== 컴포넌트
/** 자식 컴포넌트 정렬 */
function Align({
  direction = "horizontal",
  justify = "flex-start",
  align = "center",
  space = 16,
  children,
}: TAlign) {
  const rootStyleMemo = useMemo(
    () => rootStyle({ direction, space, justify, align }),
    [direction, space, justify, align]
  );

  return <div css={rootStyleMemo}>{children}</div>;
}

// ===== style
const rootStyle = ({ direction, space, justify, align }: TAlign) => css`
  display: flex;
  flex-direction: ${direction === "horizontal" ? "row" : "column"};
  justify-content: ${justify};
  align-items: ${align};
  & > * + * {
    ${direction === "horizontal"
      ? `margin-left: ${space}px`
      : `margin-top: ${space}px`}
  }
`;

// ===== export
export default Align;
