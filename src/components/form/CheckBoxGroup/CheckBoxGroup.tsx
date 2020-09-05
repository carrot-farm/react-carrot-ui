/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useCallback, useState, useEffect } from "react";

import CheckBox, { TCheckBoxProps } from "../CheckBox/CheckBox";
import Align, { TAlign } from "../../layout/Align/Align";
import { check } from "../../others/Icon/svg";

// ===== 타입
/** props type */
export type TCheckBoxGroupProps = {
  /** 기본 값 */
  defaultValue?: string[];
  /** 값 */
  value?: string[];
  /** 체크박스 컴포넌트들 */
  items: TCheckBoxProps[];
  /** 정렬방향 */
  direction?: TAlign["direction"];
  /** 컴포넌트들의 공간 */
  space?: TAlign["space"];
  /** justify-content 속성 */
  justify?: TAlign["justify"];
  /** align-items 속성 */
  align?: TAlign["align"];
  /** 체인지 이벤트 */
  onChange?: (checked: (string | undefined)[]) => void;
};

type TChanged = {
  name: string;
  checked: boolean;
};

// ===== 컴포넌트
/** 체크박스 */
function CheckBoxGroup({
  defaultValue = [],
  value = [],
  items,
  direction,
  space,
  justify,
  align,
  onChange,
}: TCheckBoxGroupProps) {
  const [_value, setValue] = useState<string[]>(value || defaultValue);
  const [changed, setChagned] = useState<TChanged>(); // name과 값 배열.
  const [_items, setItems] = useState(items);
  // console.log('> ', disabled, checked, circleBox)

  // # onChange 함수가 있을 경우 전달
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(_value);
    }
  }, [_value]);

  // # 부모요소의 값 변경 반영
  useEffect(() => {
    //
    const newValue: string[] = [];
    const newItems = _items.map((a) => {
      const v = a.name ? value.includes(a.name) : false;

      // 새로운 값 배열
      v && a.name && newValue.push(a.name);

      return {
        ...a,
        value: v,
      };
    });

    // console.log("> parent: ", newItems, _items, newValue);
    setValue(newValue);
    setItems([...newItems]);
  }, [value]);

  // # 값 변경
  useEffect(() => {
    if (changed) {
      // 값 변경
      const { name, checked } = changed || {};

      // console.log("> chaned: ", name, checked);
      // 추가
      if (checked) {
        setValue([..._value, name]);
      }
      // 삭제
      else {
        const findedIndex = _value.findIndex((a: string) => a === name);
        const removed = [..._value];
        removed.splice(findedIndex, 1);
        setValue(removed);
      }
    }
  }, [changed]);

  // # 체인지 이벤트. 스코프 문제로 직접 `_value`에 반영이 불가.
  const handleChange = useCallback(
    (e) => {
      const { name, checked } = e.currentTarget;
      setChagned({ name, checked });
    },
    [setChagned]
  );

  return (
    <div className={"carrot-ui-checkBoxGroup-root"} css={rootStyle}>
      {JSON.stringify(_value)}
      <Align
        direction={direction}
        space={space}
        justify={justify}
        align={align}
      >
        {_items.map((item: TCheckBoxProps, i: number) => (
          <CheckBox {...item} onChange={handleChange} key={i} />
        ))}
      </Align>
    </div>
  );
}

// ===== styles
const rootStyle = css`
  display: block;
  position: relative;
`;

// ===== export
export default CheckBoxGroup;
