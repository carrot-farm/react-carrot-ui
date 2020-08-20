/** @jsx jsx */
import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import { jsx, css } from "@emotion/core";

import styles from "../../../styles";
import { TMainColorKeys } from "../../../types/colors";
import ThemeContext from "../../../theme";

// ===== 타입
export type TTextFieldProps = {
  /** name 속성 */
  name?: string;
  /** 기본 값 */
  defaultValue?: string;
  /** value */
  value?: string;
  /** label */
  label?: string;
  /** row 크기 */
  rows?: number;
  /** 비활성화 유무 */
  disabled?: boolean;
  /** 읽기전용 유무 */
  readOnly?: boolean;
  /** 엔터키를 이용한 자동 높이 조정 유무 */
  autoHeight?: boolean;
  /** 에러 유무 */
  error?: boolean;
  /** 기타 속성 */
  attr?: boolean;
  /** 메인 원색 */
  mainColor?: TMainColorKeys;
  /** textarea 속성 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
};

// ===== 컴포넌트
function TextField({
  name,
  defaultValue,
  value,
  label,
  rows = 1,
  disabled,
  readOnly,
  autoHeight,
  error,
  attr,
  mainColor,
  onChange,
  ...args
}: TTextFieldProps) {
  const defaultHeightPx = 29;
  const maxHeight = useMemo(() => defaultHeightPx * rows, [
    rows,
    defaultHeightPx,
  ]);
  const [innerValue, setInnerValue] = useState(defaultValue || value);
  const [lineHeight, setLineHeight] = useState(maxHeight); // 라인 수 크기
  const [focused, setFocused] = useState<boolean>(false); // 포커스 유무
  const el = useRef<HTMLTextAreaElement>(null); // 더미 textarea 엘리먼트
  // console.log('> ', rows, lineHeight)

  // # mount
  useEffect(() => {
    el.current!.innerHTML = value || "";
    const scrollHeight = el.current!.scrollHeight;
    // console.log("> mount : ", scrollHeight, lineHeight);
    // # autoHeight 셋팅
    if (autoHeight === true && scrollHeight > lineHeight) {
      setLineHeight(scrollHeight || defaultHeightPx);
      // const enter = value.match(/\n/g);
      // const initHeight = rows * defaultHeightPx;

      // if(autoHeight === true && enter) {
      //   setLineHeight(initHeight + (enter.length * defaultHeightPx));
      // }
    }

    if (defaultValue || value) {
      setFocused(true);
    }
  }, []);

  // # value 값 변경 시
  useEffect(() => {
    // setFocused(!!value);
    if (value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  // # root style
  const rootStyleMemo = useMemo(() => [rootStyle(defaultHeightPx)], [
    defaultHeightPx,
  ]);

  // # label style memo
  const labelStyleMemo = useCallback(
    (_mainColor) => () => [labelStyle(_mainColor)],
    []
  );

  const textareaContainerMemo = useCallback(
    (_mainColor) => () => [textareaContainerStyle(_mainColor, lineHeight)],
    [lineHeight]
  );

  // # class memo
  const classMemo = useMemo<string>(
    () =>
      `${focused ? "focused" : ""} ${error ? "error" : ""} ${
        disabled ? "disabled" : ""
      }`,
    [focused, error, disabled]
  );

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
      e.currentTarget.querySelector("textarea").focus();
    },
    [focused]
  );

  // # change 이벤트 시 높이 조절
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      el.current!.innerHTML = e.currentTarget.value;
      const scrollHeight = el.current!.scrollHeight;
      const elHeight = el.current!.clientHeight;
      // const scrollHeight = e.currentTarget.scrollHeight;

      if (autoHeight === true && lineHeight != scrollHeight) {
        setLineHeight(scrollHeight);
      }

      setInnerValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [lineHeight, onChange]
  );

  el.current?.addEventListener(
    "change",
    () => {
      // console.log("dd");
    },
    true
  );

  // # render
  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _mainColor = mainColor || theme.primaryColor!;

        return (
          <div
            {...args}
            className="carrot-ui-textfield-root"
            css={rootStyleMemo}
            onClick={handleFocusIn}
          >
            {/* ===== label ===== */}
            {label && (
              <label className={classMemo} css={labelStyleMemo(_mainColor)}>
                {label}
              </label>
            )}

            {/* ===== textarea ===== */}
            <div className={classMemo} css={textareaContainerMemo(_mainColor)}>
              <textarea
                {...attr}
                name={name}
                value={innerValue}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleOnChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <textarea ref={el} css={dummyTextarea(maxHeight)} />
            </div>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

// ===== styles
const rootStyle = (lineHeight: number) => css`
  width: 100%;
  position: relative;
  margin-top: 16px;
  cursor: text;
  padding: 6px 0 7px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  line-height: ${lineHeight}px;
  background: #fff;
`;

const labelStyle = (mainColor: TMainColorKeys) => css`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  transform: translate(0, 6px) scale(1);
  transform-origin: top left;
  padding: 0;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: ${styles.getColor(mainColor)};
  fotn-size: 0.9rem;
  &.focused {
    transform: translate(0, -1rem) scale(0.75);
    font-size: 0.8rem;
  }
  &.disabled {
    color: ${styles.getColor("grey")};
  }
  &.error {
    color: ${styles.getColor("red")};
  }
`;

const textareaContainerStyle = (
  mainColor: TMainColorKeys,
  lineHeight: number
) => css`
  width: inherit;
  line-height: inherit;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "\\00a0";
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid;
    pointer-events: none;
    box-sizing: inherit;
    color: ${styles.getColor("grey-lighten-1")};
  }
  &:hover:not(.disabled)::before {
    border-bottom: 1px solid;
    color: ${styles.getColor(mainColor)};
  }

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid ${styles.getColor(mainColor)};
    pointer-events: none;
  }
  &.focused::after {
    transform: scaleX(1);
  }
  &.error::after {
    border-bottom-color: ${styles.getColor("red")};
    transform: scaleX(1);
  }
  &.disabled::after {
    border-bottom: 1px solid ${styles.getColor("grey-lighten-3")};
  }
  &.disabled {
    color: ${styles.getColor("grey-lighten-3")};
  }
  textarea:first-of-type {
    width: inherit;
    font: inherit;
    resize: none;
    padding: 0;
    color: currentColor;
    margin: 0;
    border: 0;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    line-height: inherit;
    height: ${lineHeight}px;
    &:focus {
      outline: 0;
    }
  }
`;

const dummyTextarea = (height: number) => css`
  width: inherit;
  font: inherit;
  resize: none;
  padding: 0;
  color: currentColor;
  margin: 0;
  border: 0;
  min-width: 0;
  background: none;
  box-sizing: content-box;
  line-height: inherit;
  height: ${height}px !important;
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
`;

// ===== export
export default React.memo(TextField);
