/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect, useCallback, useMemo } from "react";

import Icon from "../../Icon/Icon";
import Ripple from "../../Ripple/Ripple";
import ThemeContext from "../../../theme";
import { TMainColorKeys, TColorKeys } from "../../../types/colors";
import { getColor } from "../../../styles";

// ===== 타입
/** props type */
export type TCheckBoxProps = {
  /** form의 name속성 */
  name?: string;
  /** 체크 여부 */
  checked?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 원형 체크박스 여부 */
  circleBox?: boolean;
  /** 레이블 */
  label?: string;
  /** 아이콘 색상 */
  iconColor?: TMainColorKeys;
  /** ripple 색상 */
  rippleColor?: TColorKeys;
  /** checkebox에 적용될 기타 속성 */
  attr?: any;
  /** className */
  className?: string;
  /** 값 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// ===== 컴포넌트
/** 체크박스 */
function CheckBox({
  name,
  checked = false,
  disabled = false,
  circleBox = false,
  label,
  iconColor,
  rippleColor,
  attr,
  className,
  onChange,
  ...args
}: TCheckBoxProps) {
  const [_checked, setChecked] = useState(checked);

  // # 값 변경 감시
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  // #  iconColor
  const _iconColor = useCallback(
    (primaryColor?: TMainColorKeys): TMainColorKeys =>
      iconColor || primaryColor === "white" ? "black" : primaryColor!,
    [iconColor]
  );

  // # ripple color
  const _rippleColor = useCallback(
    (primaryRippleColor?: TColorKeys) => rippleColor || primaryRippleColor,
    [rippleColor]
  );

  // # 클릭 이벤트 시
  const handleChange = useCallback((e) => {
    // console.log("> ", e.currentTarget.checked);
    if (onChange) {
      onChange(e);
    }
    setChecked(e.currentTarget.checked);
  }, []);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        return (
          <div
            {...args}
            className={`carrot-ui-checkbox-root ${className ? className : ""}`}
            css={rootStyle}
          >
            <label css={containerStyle(disabled)}>
              <div css={wrapperStyle(disabled, circleBox)}>
                {/* 실제 체크박스 */}
                <input
                  {...attr}
                  type="checkbox"
                  name={name}
                  checked={_checked}
                  disabled={disabled}
                  onChange={handleChange}
                />

                {/* 아이콘 */}
                <Icon
                  name="checkThin"
                  size="s"
                  color={_checked ? _iconColor(theme.primaryColor) : "white"}
                  css={iconStyle}
                />

                {/* ripple */}
                {!disabled && (
                  <Ripple color={_rippleColor(theme.primaryRippleColor)} />
                )}
              </div>
              {/* 레이블 */}
              {label && <div css={labelStyle(disabled)}>{label}</div>}
            </label>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

// ===== styles
const rootStyle = css`
  display: inline-block;
  position: relative;
  input {
    display: none;
  }
  lihe-height: 0;
`;

const containerStyle = (disabled: boolean) => css`
  display: flex;
  align-items: center;
  ${disabled
    ? `cursor: default;
    color: #adb5bd;
    `
    : `cursor: pointer; color: #212529;`}
`;

const wrapperStyle = (disabled: boolean, circleBox: boolean) => css`
  cursor: ${disabled ? "default" : "pointer"};
  position: relative;
  width: 25px;
  height: 25px;
  background-color: ${disabled ? "#f8f9fa" : getColor("grey-lighten-3")};
  transition: all 0.2s;
  cursor: ${disabled ? "default" : "pointer"};
  border-radius: ${circleBox ? "50%" : "none"};
  overflow: hidden;
`;

const iconStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
`;

const labelStyle = (disabled: boolean) => css`
  font-size: 0.8rem;
  top: 0.2rem;
  margin-left: 0.5rem;
  ${disabled
    ? `cursor: default;
    color: #adb5bd;
    `
    : `cursor: pointer; color: #212529;`}
`;

// ===== export
export default CheckBox;
