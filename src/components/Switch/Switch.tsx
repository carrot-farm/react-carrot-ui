/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useCallback, useState } from 'react';

import styles from '../../styles'
import { TMainColorKeys } from '../../types/colors';
import ThemeContext from '../../theme';

// ===== 타입
export type SwitchPropsType = {
  /** name 속성 */
  name?: string;
  /** checked 값 */
  checked?: boolean;
  /** 비활성화 유무 */
  disabled?: boolean;
  /** 메인 원색 */
  mainColor?: TMainColorKeys;
  /** 기타 속성 */
  attr?: boolean;
  /** textarea 속성 */
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => any;
};

// ===== 컴포넌트
function Switch({
  name,
  checked,
  disabled,
  mainColor,
  attr,
  onChange,
}: SwitchPropsType) {

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const _mainColor = mainColor || theme.primaryColor!;

        return (
          <div css={[rootStyle(_mainColor)]} >
            <label>
              {/* switch */}
              <input
                {...attr}
                type="checkbox"
                name={name}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                
              />

              {/* switch 모양 */}
              <div className={`carrot-ui_switch-conatiner ${disabled ? 'disabled' : ''}`}>
                <div className={"carrot-ui_switch-track"} />
                <div className={"carrot-ui_switch-thumb"} />
              </div>
            </label>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  );
}

// ===== styles
const rootStyle = (mainColor:TMainColorKeys) => css`
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
      width: 50px;
      height: 30px;
      border-radius: 15.5px;
      background-color: ${styles.getColor('grey-lighten-3')};
      transition: background-color .2s;
    }
    .carrot-ui_switch-thumb {
      width: 26px;
      height: 26px;
      background-color: ${styles.getColor('white')};
      border-radius: 50%;
      transition: background-color, transform .2s linear;
      z-index: 1;
      position: absolute;
      left: 3px;
      top: 2px;
      boxShadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
    }
    &.disabled {
      cursor: default;
      .carrot-ui_switch-track {
        background-color: ${styles.getColor('grey-lighten-4')} !important;
      }
      .carrot-ui_switch-thumb {
        background-color: ${styles.getColor('white')} !important;
      }
    }
  }

  input:checked + .carrot-ui_switch-conatiner {
    .carrot-ui_switch-track {
      background-color: ${styles.getColor(mainColor)};
      transition: background-color .2s;
    }
    .carrot-ui_switch-thumb {
      transform: translateX(18px)
    }
  }
`



// ===== export
export default React.memo(Switch);