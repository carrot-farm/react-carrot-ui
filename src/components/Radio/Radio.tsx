/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import styles, { ColorsType } from '../../styles';
import Ripple from '../Ripple/Ripple';

// ===== type
// # props type
type RadioPropsType = {
  /** name attribute */
  name: string;
  /** value 속성 */
  value: string;
  /** checked 속성 */
  checked?: boolean;
  /** label */
  label?: string;
  /** 테마 색상 */
  themeColor?: ColorsType;
  /** 비활성화 */
  disabled?: boolean;
  /** 값 변경 이벤트 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

// ===== component
function Radio({
  name,
  value,
  checked,
  label,
  themeColor = 'lime',
  disabled,
  onChange,
}: RadioPropsType) {

  // # 렌더링
  return (
    <div css={[rootStyle]}>
      <label css={[radioContainerStyle]}>
        {/* radio button */}
        <span css={[radioButtonStyle(themeColor)]}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
          <span className={`button-outer`} >
            {(!disabled || !checked) && <Ripple color={themeColor} />}
          </span>
          <span className={`button-inner`} />
        </span>

        {/* label */}
        <span className={`label ${disabled ? 'disabled' : ''}`}>{label}</span>
      </label>
    </div>
  );
}

// ===== styles
const rootStyle = css`
  position: relative;
`;

const radioContainerStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;

  .label {
    display: block;
    margin-left: 7px;
    font-size: 0.9rem;
    color: ${styles.getColor('grey-darken-4')};
  }
  .label.disabled {
    color: ${styles.getColor('grey')};
  }
`

const radioButtonStyle = (themeColor: ColorsType) => css`
  position: relative;
  display: inline-block;
  height: 25px;
  width: 25px;
  

  input {
    display: none;
  }

  .button-outer {
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    box-sizing: border-box;
    line-height: 0;
    overflow: hidden;
    position: relative;
    background-color: ${styles.getColor('grey-lighten-5')}
  }

  .button-inner {
    display:block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 15px;
    height: 15px;
    margin-left: -7.5px;
    margin-top: -7.5px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.2s linear;
    background-color: ${styles.getColor(themeColor)};
  }
  input:checked ~ .button-inner {
    transform: scale(1);
  }
  input:disabled ~ .button-inner {
    background-color: ${styles.getColor('grey')};
  }

  
`;


// ===== export
export default Radio;