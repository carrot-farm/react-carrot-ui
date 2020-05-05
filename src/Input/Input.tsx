/** @jsx jsx */
import { useCallback, useState, useRef, useEffect } from 'react';
import { jsx, css } from '@emotion/core';

import styles, { ColorsType } from '../styles';

// ===== type
// # props type
type InputPropsType = {
  /** name attribute */
  name?: string;
  /** type 속성 */
  type?: string;
  /** value 속성 */
  value?: string;
  /** label */
  label?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 읽기전용 */
  readOnly?: boolean;
  /** 에러 유무 */
  error?: boolean;
  /** 도움말 */
  helperText?: string;
  /** input의 기타 속성 */
  attr?: any
  /** 값 변경 이벤트 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

// ===== component
function Input({
  name,
  type = "text",
  value,
  label,
  disabled,
  readOnly,
  error,
  helperText,
  attr,
  onChange,
}: InputPropsType) {
  const inputEl = useRef<HTMLInputElement>(null); // input element
  const [focused, setFocused] = useState<boolean>(false); // 포커스 유무

  useEffect(() => {
    setFocused(!!value);
  }, [value])

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
      e.currentTarget.querySelector("input").focus();
    },
    [inputEl]
  );

  // # 렌더링
  return (
    <div css={[rootStyle()]} onClick={handleFocusIn}>
      {/* label */}
      {label && <label css={labelStyle}
        className={`${focused ? "focused" : ""} ${error ? "error" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >{label}</label>}

      {/* input */}
      <div
        css={[inputContainerStyle]}
        className={`${focused ? "focused" : ""} ${error ? "error" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        <input
          {...attr}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputEl}
        />
      </div>

      {/* helper text */}
      {helperText && (
        <div css={[helperTextStyle(error ? "red" : "grey-darken-1")]}>
          {helperText}
        </div>
      )}
    </div>
  );
}

// ===== styles
const rootStyle = () => css`
  position: relative;
	cursor: text;
	padding: 6px 0 7px;
	display: block;
	align-items: center;
	line-height: 1.4em;
	box-sizing: border-box;
  width: inherit;
  
  margin: 8px;
  margin-top: 22px;
  margin-bottom: 1.2rem;
`;

const labelStyle = css`
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  transform: translate(0, 6px) scale(1);
  transform-origin: top left;
  padding: 0;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, 
  transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: ${styles.getColor('grey-darken-2')};
  fotn-size: 0.9rem;
  &.focused {
    transform: translate(0, -1rem) scale(0.75);
    font-size: 0.8rem;
    color: ${styles.getColor('black')};
  }
  &.error {
    color: ${styles.getColor('red')};
  }
  &.disabled {
    color: ${styles.getColor('grey')};
  }
`;

const inputContainerStyle = css`
  width: inherit;
  &::before {
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    content: '\\00a0';
    transition: border-bottom-color, border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid;
    border-bottom-color: ${styles.getColor('grey-lighten-3')};
    pointer-events: none;
    box-sizing: inherit;
    height: 1px;
  }
  &::hover:not(.disabled)::before {
    border-bottom: 2px solid;
    border-bottom-color: ${styles.getColor('black')};
  }
  &::after {
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    content: "";
    transform: scaleX(0);
    transition: transform, border-bottom-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid;
    border-bottom-color: ${styles.getColor('black')};
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
    border-bottom-color: ${styles.getColor('grey')};
  }
  &.disabled {
    border-color: ${styles.getColor('grey-lighten-3')};
  }
  input {
    font: inherit;
    resize: none;
    padding:0;
    color: currentColor;
    margin: 0;
    border: 0;
    width: inherit;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:focus {
      outline: 0;
    }
    input[disabled] {
      cursor: default;
    }
    &:disabled {
      color: ${styles.getColor('grey')};
    }
    &::-ms-clear {
      display: none;
    }
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input::-internal-autofill-selected {
    background-color: transparent !important;
  }
`;

const helperTextStyle = (color: ColorsType )=> css`
  position: absolute;
  bottom: -1.3rem;
  left:0;
  font-size: 0.7rem;
  transition: color .2s;
  color: ${styles.getColor(color)}
`;

// ===== export
export default Input;