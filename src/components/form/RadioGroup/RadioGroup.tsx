/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useCallback, useState, useEffect } from "react";

import Radio, { TRadioProps } from "../Radio/Radio";
import Align, { TAlign } from "../../layout/Align/Align";

// ===== 타입
/** props type */
export type TRadioGroupProps = TAlign & {
  /** 라디오 구조 배열 */
  items: IRadioGroupItem[];
  /** name 속성 */
  name: string;
  /** 기본값 */
  defaultValue?: string;
  /** 현재값 */
  value?: string;
  /** 체인지 이벤트 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => boolean | void;
};

export interface IRadioGroupItem {
  /** 라벨 */
  label?: string;
  /** name  속성 */
  name?: string;
  /** 값 */
  value?: string;
  /** 비활성화 */
  disabled?: boolean;
}

// ===== 컴포넌트
/** 라디오 버튼 그룹 */
function RadioGroup({
  name,
  defaultValue,
  value,
  items,
  direction = "horizontal",
  justify = "flex-start",
  align = "center",
  space = 16,
  onChange,
}: TRadioGroupProps) {
  const [_value, setValue] = useState(defaultValue);

  // # value 변경 감지
  useEffect(() => {
    if (value) {
      setValue(value);
    }
    // console.log("> change:  ", value);
  }, [value]);

  // # change event
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange && onChange(e) === false) {
        return;
      }
      // console.log("> e", e.currentTarget.value);
      setValue(e.currentTarget.value);
    },
    [_value]
  );

  return (
    <div className={"carrot-ui-radioGroup-root"} css={rootStyle}>
      {/* {JSON.stringify(_checked)} */}
      <Align
        direction={direction}
        justify={justify}
        align={align}
        space={space}
      >
        {items?.length &&
          items.map((item: TRadioProps, i: number) => (
            <Radio
              {...item}
              name={name}
              onChange={handleChange}
              checked={item.value === _value}
              key={i}
            />
          ))}
      </Align>
    </div>
  );
}

// ===== styles
const rootStyle = css`
  display: inline-block;
  position: relative;
`;

// ===== export
export default RadioGroup;
