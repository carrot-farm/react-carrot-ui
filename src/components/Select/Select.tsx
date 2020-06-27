/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, useRef, useCallback } from 'react';

import styles from '../../styles';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Ripple from '../Ripple/Ripple';
import Folding from '../Folding/Folding';


// ===== type
// # props type
export type TSelectProps = {
  /** name attribute */
  name: string;
  /** value 속성 */
  value: string;
  /** options 값 */
  options: OptionsType[];
  /** native로 보여줄 것인지 결정. */
  native?: boolean;
  /** 기타 속성 */
  attr?: any;
  /** 값 변경 이벤트 */
  onChange?: (selectedOption: OptionsType) => any,
};
// # options type
export interface OptionsType {
  /** 내부 문자 */
  text: string;
  /** 값 */
  value: string;
  /** 비활성화 */
  disabled?: boolean;
};

// ===== component
function Select({
  name,
  value,
  options,
  native = false,
  attr,
  onChange,
}: TSelectProps) {
  const nativeEl = useRef<HTMLSelectElement>(null);
  const [ headText, setHeadText ] = useState('');
  const [ sw, setSw ] = useState(false);
  const [_value, setValue] = useState(value);

  // # mount
  useEffect(() => {
    if(options && options.length) {
      const finded = options.find((a: OptionsType) => a.value === _value);
      setHeadText(finded ? finded.text : options[0].text);
    }
  }, []);

  // # 외부에서 값 변경
  useEffect(() => {
    const finded = options.find((a: OptionsType) => a.value === value)!;
    setValue(finded.value);
    setHeadText(finded.text);
  }, [value])

  // # 셀렉트 박스 on/off 컨틀롤러
  const handleToggleClick = () => {
    setSw(!sw);
  };

  // # option 클릭
  const handleOptionClick = useCallback((
    index: number, 
    disabled: boolean | undefined,
    selectedOption: OptionsType
  ) => {
    // 이벤트 트리거 
    if(nativeEl.current) {
      nativeEl.current.selectedIndex = index;
      nativeEl.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if(!disabled) {
      setSw(false);
    }
    if(onChange && onChange(selectedOption) === false) {
      return false;
    }
  }, [value, options, onChange]);

  const handleDummyOnChnage = () => {

  }

  // # 렌더링
  if(!options || !options.length) {
    return null
  }

  return (
    <div className="carrot-ui-select-root" css={[rootStyle]}>
      {/* ===== 실제 셀렉트 엘리먼트 ===== */}
      <select
        {...attr}
        name={name}
        value={_value}
        onChange={handleDummyOnChnage}
        css={nativeSelectSTyle(native)}
        ref={nativeEl}
      >
        {options.map((a, i) => (
          <option value={a.value} key={`select-${i}`} disabled={a.disabled}>
            {a.text}
          </option>
        ))}
      </select>

      {/* ===== 커스텀 셀렉트 엘리먼트 ===== */}
      {!native && 
        <div css={[customSelectRooStyle]} >
          {/* head */}
          <div className="custom-select-head" onClick={handleToggleClick}>
            <Container className="custom-select-head-container">
              <div className={'head-text'}>{headText}</div>
              <div className="folding-button">
                <Icon name={sw ? 'angleUpThin' : 'angleDownThin'} />
              </div>
            </Container>
            <Ripple color={'grey-lighten-2'} />
          </div>

          {/* 셀렉트 박스 */}
          <div className="custom-select-options" css={[cusotmSelectStyle]}>
            <Folding sw={sw} float={true}>
              <ul >
                {options.map((a, i) => (
                  <li
                    className={`${a.disabled ? "disabled" : ""} ${
                      value === a.value ? "selected" : ""
                    }`}
                    data-value={a.value}
                    key={`custom-select-${i}`}
                    onClick={() => handleOptionClick(i, a.disabled, a)}
                  >
                    <Container>{a.text}</Container>
                    {!a.disabled && <Ripple color={'grey-lighten-2'} />}
                  </li>
                ))}
              </ul>
            </Folding>
          </div>
        </div>
      }
    </div>
  );
}

// ===== styles
const rootStyle = css`
  position: relative;
  width: inherit;
`;

const nativeSelectSTyle = (native: boolean) => css`
  display: ${native ? 'block' : 'none'};
  height: 47px;
  width: 100%;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const customSelectRooStyle = css`
  position: relative;


  .custom-select-head {
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${styles.getColor('grey-lighten-5')};
    position: relative;
    overflow: hidden;
    cursor: pointer;
    .custom-select-head-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const cusotmSelectStyle = css`
  position: relative;
  font-size: 0.9rem;
  border: 1px solid ${styles.getColor('grey-lighten-5')};
  box-sizing: border-box;
  z-index: 1001;
  
  & > div {
    // box-shadow: 3px 6px 15px rgba(0, 0, 0, .15);
    // width: 100%;
    // position: absolute;
    // top: 0;
    // left:0;
  }
  
  ul {
    list-style-type: none;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 180px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  li {
    display: flex;
    align-items: center;
    height: 45px;
    box-sizing: border-box;
    border-bottom: 1px solid ${styles.getColor('grey-lighten-3')};
    cursor: pointer;
    background-color: #fff;
    transition: background-color .2s linear;
    position: relative;
    overflow: hidden;
    &:hover:not(.disabled) {
      background-color: ${styles.getColor('grey-lighten-5')}
    }
    &.disabled {
      cursor: default;
      color: ${styles.getColor('grey')};
    }
    &.selected {
      background-color: ${styles.getColor('grey-lighten-5')};
    }
    
  }
`;



// ===== export
export default Select;