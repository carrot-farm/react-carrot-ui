/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import styles from "../../../styles";

// ===== 타입
export interface TablePropsType {
  /** table의 td, tr 같은 내부 컨텐츠 */
  children: React.ReactNode;
  /** 반응형 테이블 유무 */
  responsive: boolean;
}

// ===== 컴포넌트
function Table({ children, responsive, ...args }: TablePropsType) {
  return (
    <table
      {...args}
      css={[rootStyle, responsive ? responsiveTable : undefined]}
    >
      {children}
    </table>
  );
}

// ===== styles
const rootStyle = css`
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  width: 100%;
  border: none;

  th {
    font-weight: 700;
  }
  tr {
    border-bottom: 1px solid #ddd;
  }
  td,
  th {
    padding: 15px 10px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
    border: none;
  }
`;

const responsiveTable = styles.media.s(`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  display: block;
  position: relative;
  thead {
    border: 0;
    border-right: 1px solid #ddd;
    display: block;
    float: left;
    &:after {
      clear: both;
      display: block;
    }
    tr {
      display: block;
      padding: 0 10px 0 0;
      border-bottom: none;
      th {
        display: block;
        text-align: right;
      }
    }
  }
  tbody {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
    tr {
      display: inline-block;
      vertical-align: top;
      border-bottom: none;
      padding: 0 10px;
      td {
        display: block;
        min-height: 1.25em;
        text-align: left;
        margin: 0;
        // vertical-align: top;
      }
    }
  }
`);

// ===== export
export default Table;
