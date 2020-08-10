/** @jsx jsx */
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { jsx, css } from "@emotion/core";

import styles from "../../styles";
import { TMainColorKeys, TColorKeys } from "../../types/colors";
import colors from "../../styles/colors";
import ThemeContext from "../../theme";

// ===== type
// # props type
export interface TInputProps {
  /** name attribute */
  name?: string;
  /** type 속성 */
  type?: string;
  /** 기본값 */
  defaultValue?: string;
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
  attr?: any;
  /** 컬러 */
  color?: TMainColorKeys;
  /** 값 변경 이벤트 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ===== component
function Input({
  name,
  type = "text",
  defaultValue,
  value,
  label,
  disabled,
  readOnly,
  error,
  helperText,
  attr,
  color,
  onChange,
  ...args
}: TInputProps) {
  const [innerValue, setInnerValue] = useState<string | undefined>(
    defaultValue || value
  );
  const inputEl = useRef<HTMLInputElement>(null); // input element
  const [focused, setFocused] = useState<boolean>(false); // 포커스 유무
  const rootStyleMemo = useMemo(() => [rootStyle()], []);

  useEffect(() => {
    if (defaultValue || value) {
      setFocused(true);
    }
  }, []);

  // # value props가 변경 시 변경된 값 적용.
  useEffect(() => {
    // setFocused(!!value);
    if (value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  // # focus event
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, [focused]);

  // # blur event
  const handleBlur = useCallback(
    (e) => {
      if (!e.currentTarget.value) {
        setFocused(false);
      }
    },
    [focused]
  );

  // # 어디를 누르던 focus in
  const handleFocusIn = useCallback(
    (e) => {
      e.currentTarget.querySelector("input").focus();
    },
    [inputEl]
  );

  // # 체인지 이벤트
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  }, []);

  // # 렌더링
  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _color = color || theme.primaryColor!;
        return (
          <div
            {...args}
            className="carrot-ui-input-root"
            css={rootStyleMemo}
            onClick={handleFocusIn}
          >
            {/* label */}
            {label && (
              <label
                css={labelStyle(_color)}
                className={`${focused ? "focused" : ""} ${
                  error ? "error" : ""
                } ${disabled ? "disabled" : ""}`}
              >
                {label}
              </label>
            )}

            {/* input */}
            <div
              css={[inputContainerStyle(_color)]}
              className={`${focused ? "focused" : ""} ${error ? "error" : ""} ${
                disabled ? "disabled" : ""
              }`}
            >
              <input
                {...attr}
                name={name}
                type={type}
                value={innerValue}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
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
      }}
    </ThemeContext.Consumer>
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

const labelStyle = (color: TMainColorKeys) => css`
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  transform: translate(0, 6px) scale(1);
  transform-origin: top left;
  padding: 0;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: ${styles.getColor(color)};
  fotn-size: 0.9rem;
  &.focused {
    transform: translate(0, -1rem) scale(0.75);
    font-size: 0.8rem;
  }
  &.error {
    color: ${styles.getColor("red")};
  }
  &.disabled {
    color: ${styles.getColor("grey")};
  }
`;

const inputContainerStyle = (color: TMainColorKeys) => css`
  width: 100%;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "\\00a0";
    // transition: border-bottom-color, border-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid;
    border-bottom-color: ${styles.getColor("grey-lighten-1")};
    pointer-events: none;
    box-sizing: inherit;
    height: 1px;
  }
  &:hover:not(.disabled)::before {
    border-bottom: 1px solid;
    border-bottom-color: ${styles.getColor(color)};
  }
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    transform: scaleX(0);
    transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid;
    border-bottom-color: ${styles.getColor(color)};
    pointer-events: none;
    paddint-top: 50px;
  }
  &.focused::after {
    transform: scaleX(1);
  }
  &.error::after {
    border-bottom-color: ${styles.getColor("red")};
    transform: scaleX(1);
  }
  &.disabled::after {
    border-bottom-color: ${styles.getColor("grey")};
  }
  &.disabled {
    border-color: ${styles.getColor("grey-lighten-3")};
  }
  input {
    font: inherit;
    resize: none;
    padding: 0;
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
      color: ${styles.getColor("grey")};
    }
    &::-ms-clear {
      display: none;
    }
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input::-internal-autofill-selected {
    background-color: transparent !important;
  }
`;

const helperTextStyle = (color: TColorKeys) => css`
  position: absolute;
  bottom: -1.3rem;
  left: 0;
  font-size: 0.7rem;
  transition: color 0.2s;
  color: ${styles.getColor(color)};
`;

// ===== export
export default React.memo(Input);
