/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { ColorsType } from '../styles';
import Icon from '../Icon/Icon';
import Ripple from '../Ripple/Ripple';

// ===== 타입
/** props type */
type CheckBoxPropsType = {
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
  /** checkebox에 적용될 기타 속성 */
  attr?: any;
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
  attr,
  onChange,
}: CheckBoxPropsType) {
  // console.log('> ', disabled, checked, circleBox)
  let iconColor: ColorsType = 'white';
  if(checked) {iconColor = 'black';}
  if(disabled) {iconColor = 'grey'}

  return (
    <div css={[rootStyle]}>
      <label>
        <div css={wrapperStyle(disabled, circleBox)}>
          {/* 실제 체크박스 */}
          <input
            {...attr}
            type="checkbox"
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />

          {/* 아이콘 */}
          <Icon
            name="checkThin"
            size="s"
            color={iconColor}
            css={[iconStyle]}
          />

          {/* ripple */}
          {!disabled && <Ripple color={'white'} />}
        </div>
        {/* 레이블 */}
        {label && <div css={[labelStyle(disabled)]}>{label}</div>}
      </label>
    </div>
  );
}

// ===== styles
const rootStyle = css`
  display: inline-block;
  position: relative;
  input {
    display: none;
  }
`;

const wrapperStyle = (disabled: boolean, circleBox: boolean) => css`
  cursor: ${disabled ? "default" : "pointer"};
  position: relative;
  width: 25px;
  height: 25px;
  background-color: ${disabled ? '#f8f9fa' : '#e9ecef'};
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
  position: absolute;
  left: 30px;
  ${disabled ? 
    `cursor: default;
    color: #adb5bd;
    `
  : `cursor: pointer; color: #212529;`}
`;

// ===== export
export default CheckBox;