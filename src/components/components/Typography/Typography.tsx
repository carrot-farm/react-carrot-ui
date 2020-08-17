/** @jsx jsx */
import { jsx, css as emotionCss, SerializedStyles } from "@emotion/core";
import { useMemo } from "react";

import Base from "../../Base/Base";
import { TColorKeys } from "../../../types/colors";

export interface TTypography {
  /** 텍스트 사이즈 */
  size?: "xs" | "s" | "m" | "l" | "xl";
  /** 색상 */
  color?: TColorKeys;
  /** 굵기 */
  weight?: "lighter" | "normal" | "bolder";
  /** 컴포넌트 */
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "p";
  /** 텍스트 */
  children?: string | number;
}

/** 타이포 그라피 */
function Typography({
  size = "m",
  color = "grey-darken-2",
  weight = "normal",
  component = "p",
  children,
}: TTypography) {
  const rootStyle = useMemo<SerializedStyles>(
    () =>
      emotionCss`
    font-size: ${
      size === "xs"
        ? "0.7rem"
        : size === "s"
        ? "0.8rem"
        : size === "m"
        ? "0.9rem"
        : size === "l"
        ? "1rem"
        : "1.2rem"
    };
    line-height: 2em;
    font-weight: ${weight};
  `,
    [size, weight]
  );

  return (
    <Base color={color} component={component} css={rootStyle}>
      {children}
    </Base>
  );
}

export default Typography;
