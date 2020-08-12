/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useCallback, useState, useEffect } from "react";

import Radio, { TRadioProps } from "../Radio/Radio";

// ===== 타입
/** props type */
export type TRadioGroupProps = {
  /** 라디오 구조 배열 */
  items: TRadioProps[];
  /** 기본값 */
  defaultValue?: string;
  /** 현재값 */
  value?: string;
  /** 체인지 이벤트 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// ===== 컴포넌트
/** 라디오 버튼 그룹 */
function RadioGroup({
  items,
  defaultValue,
  value,
  onChange,
}: TRadioGroupProps) {
  const [_value, setValue] = useState(defaultValue);
  console.log("> ", _value);

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
      if (onChange) {
        onChange(e);
      }
      // console.log("> e", e.currentTarget.value);
      setValue(e.currentTarget.value);
    },
    [_value]
  );

  return (
    <div className={"carrot-ui-radioGroup-root"} css={rootStyle}>
      {/* {JSON.stringify(_checked)} */}
      {items?.length &&
        items.map((item: TRadioProps, i: number) => (
          <Radio
            {...item}
            onChange={handleChange}
            checked={item.value === _value}
            key={i}
          />
        ))}
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
