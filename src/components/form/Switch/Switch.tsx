/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useEffect, useCallback, useState, useMemo } from "react";

import styles from "../../../styles";
import { TMainColorKeys } from "../../../types/colors";
import ThemeContext from "../../../theme";

// ===== 타입
export interface TSwitchProps {
  /** name 속성 */
  name?: string;
  /** 클래스명 */
  className?: string;
  /** style */
  style?: React.CSSProperties;
  /** 기본값 */
  defaultValue?: boolean;
  /** 값 */
  value?: boolean;
  /** 비활성화 유무 */
  disabled?: boolean;
  /** 메인 원색 */
  mainColor?: TMainColorKeys;
  /** 기타 속성 */
  attr?: boolean;
  /** textarea 속성 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => boolean | void;
}

// ===== 컴포넌트
function Switch({
  name,
  className,
  style,
  defaultValue,
  value,
  disabled,
  mainColor,
  attr,
  onChange,
  ...args
}: TSwitchProps) {
  const [_value, setValue] = useState(defaultValue);
  // console.log("> switch: ", _value, value, defaultValue);

  // # 이벤트 변경 감시
  useEffect(() => {
    setValue(value);
  }, [value]);

  // # className
  const classNameMemo = useMemo(() => className || "", [className]);

  // # 값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && onChange(e) === false) {
      return;
    }
    setValue(e.currentTarget.checked);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _mainColor = mainColor || theme.primaryColor!;

        return (
          <div
            {...args}
            className={`carrot-ui-switch-root ${classNameMemo}`}
            style={style}
            css={rootStyle(_mainColor)}
          >
            <label>
              {/* switch */}
              <input
                {...attr}
                type="checkbox"
                name={name}
                checked={!!_value}
                disabled={disabled}
                onChange={handleChange}
              />

              {/* switch 모양 */}
              <div
                className={`carrot-ui_switch-conatiner ${
                  disabled ? "disabled" : ""
                }`}
              >
                <div className={"carrot-ui_switch-track"} />
                <div className={"carrot-ui_switch-thumb"} />
              </div>
            </label>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

// ===== styles
const rootStyle = (mainColor: TMainColorKeys) => css`
  position: relative;
  display: inline-block;
  input {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    z-index: 0;
    display: none;
  }

  .carrot-ui_switch-conatiner {
    position: relative;
    cursor: pointer;
    .carrot-ui_switch-track {
      width: 42px;
      height: 24px;
      border-radius: 12px;
      background-color: ${styles.getColor("grey-lighten-3")};
      transition: background-color 0.2s;
    }
    .carrot-ui_switch-thumb {
      width: 20px;
      height: 20px;
      background-color: ${styles.getColor("white")};
      border-radius: 50%;
      transition: background-color, transform 0.2s linear;
      z-index: 1;
      position: absolute;
      left: 5px;
      top: 2px;
      boxshadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
    }
    &.disabled {
      cursor: default;
      .carrot-ui_switch-track {
        background-color: ${styles.getColor("grey-lighten-4")} !important;
      }
      .carrot-ui_switch-thumb {
        background-color: ${styles.getColor("white")} !important;
      }
    }
  }

  input:checked + .carrot-ui_switch-conatiner {
    .carrot-ui_switch-track {
      background-color: ${styles.getColor(mainColor)};
      transition: background-color 0.2s;
    }
    .carrot-ui_switch-thumb {
      transform: translateX(15px);
    }
  }
`;

// ===== export
export default Switch;
