/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Base, { BaseProps } from "../../others/Base/Base";
import styles from "../../../styles";

// ===== 타입
interface ContainerPropsType extends BaseProps {
  /** 꽉차게 */
  fullWidth?: boolean;
}

// ===== 컴포넌트
function Container({
  fullWidth,
  children,
  className,
  backgroundColor,
  ...args
}: ContainerPropsType) {
  return (
    <Base
      {...args}
      className={className}
      css={[mobile, tablet, fullWidth ? fullWidthStyle : undefined]}
      backgroundColor={backgroundColor}
    >
      {children}
    </Base>
  );
}

// ===== 스타일
const mobile = styles.media.s(`
  width: 90%;
  margin: auto;
`);

const tablet = styles.media.m(`
  width: 90%;
  margin: auto;
`);

// const desktop = styles.media.l(`
//   width: 1200px;
//   max-width: 90%;
//   margin: auto;
// `);

const fullWidthStyle = css`
  width: 100% !important;
  max-width: 100% !important;
`;

// ===== export
export default Container;
