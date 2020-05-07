/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useCallback, useState } from 'react';

import styles, { ColorsType } from '../../styles'

// ===== 타입
export type TextFieldPropsType = {
  /** name 속성 */
  name: string;
  /** value */
  value: string;
  /** label */
  label?: string;
  /** row 크기 */
  rows?: number;
  /** 비활성화 유무 */
  disabled?: boolean;
  /** 읽기전용 유무 */
  readOnly?: boolean;
  /** 에러 유무 */
  error?: boolean;
  /** 기타 속성 */
  attr?: boolean;
  /** 메인 원색 */
  primaryColor?: ColorsType;
  /** textarea 속성 */
  onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// ===== 컴포넌트
function TextField({
  name,
  value,
  label,
  rows = 1,
  disabled,
  readOnly,
  error,
  attr,
  primaryColor = 'blue',
  onChange,
}: TextFieldPropsType) {
  const lineHeightPx = rows * (22); // 라인 수 크기
  const [focused, setFocused] = useState<boolean>(false); // 포커스 유무

  // # value 값 변경 시
  useEffect(() => {
    setFocused(!!value);
  }, [value]);

  // # focus event
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, [focused]);

  // # blur event
  const handleBlur = useCallback((e) => {
    if(!e.currentTarget.value) {
      setFocused(false);
    }
  }, [focused]);

  // # 어디를 누르던 focus in 
  const handleFocusIn = useCallback(
    (e) => {
      e.currentTarget.querySelector("textarea").focus();
    },
    [focused]
  );

  return (
    <div css={[rootStyle]} onClick={handleFocusIn}>
      {/* ===== label ===== */}
      {label && (
        <label
          className={`${focused ? "focused" : ""} ${error ? "error" : ""} ${
            disabled ? "disabled" : ""
          }`}
          css={[labelStyle(primaryColor)]}
        >
          {label}
        </label>
      )}

      {/* ===== textarea ===== */}
      <div
        className={`${focused ? "focused" : ""} ${error ? "error" : ""} ${
          disabled ? "disabled" : ""
        }`}
        css={[textareaContainerStyle(primaryColor, lineHeightPx)]}
      >
        <textarea
          {...attr}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

// ===== styles
const rootStyle = css`
  position: relative;
  margin-top: 16px;
  cursor: text;
  padding: 6px 0 7px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4rem;
`

const labelStyle = (primaryColor: ColorsType) => css`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  transform: translate(0, 6px) scale(1);
  transform-origin: top left;
  padding: 0;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, 
  transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: ${styles.getColor('grey-darken-1')};
  &.focused {
    transform: translate(0, -1rem) scale(0.75);
    color: ${styles.getColor(primaryColor)};
  }
  &.disabled {
    color: ${styles.getColor('grey')};
  }
  &.error {
    color: ${styles.getColor('red')};
  }
`;

const textareaContainerStyle = (primaryColor: ColorsType, lineHeightPx: number) => css`
  width: inherit;
  line-height: inherit;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "\\00a0";
    transition: border-bottom-color;
    border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid;
    pointer-events: none;
    box-sizing: inherit;
    color: ${styles.getColor("grey-lighten-3")};
  }
  &:hover:not(.disabled)::before {
    border-bottom: 2px solid;
    color: ${styles.getColor("black")};
  }

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid ${styles.getColor(primaryColor)};
    pointer-events: none;
  }
  &.focused::after {
    transform: scaleX(1);
  }
  &.error::after {
    border-bottom-color: ${styles.getColor('red')};
    transform: scaleX(1);
  }
  &.disabled::after {
    border-bottom: 1px solid ${styles.getColor('grey-lighten-3')};
  }
  &.disabled {
    color: ${styles.getColor('grey-lighten-3')};
  }
  textarea {
    width: inherit;
    font: inherit;
    resize: none;
    padding:0;
    color: currentColor;
    margin: 0;
    border: 0;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    line-height: inherit;
    height: ${lineHeightPx}px;
    &:focus {
      outline: 0;
    }
  }
`;


// ===== export
export default TextField;