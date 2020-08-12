/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useCallback, useState, useEffect } from "react";

import { getColor } from "../../styles";
import { TMainColorKeys, TColorKeys } from "../../types/colors";
import Icon from "../Icon/Icon";
import Ripple from "../Ripple/Ripple";
import ThemeContext from "../../theme";
import CheckBox, { TCheckBoxProps } from "../CheckBox/CheckBox";

// ===== 타입
/** props type */
export type TCheckBoxGroupProps = {
  items: TCheckBoxProps[];
  onChange?: (checked: (string | undefined)[]) => void;
};

type TChanged = {
  name: string;
  checked: boolean;
};

// ===== 컴포넌트
/** 체크박스 */
function CheckBoxGroup({ items, onChange }: TCheckBoxGroupProps) {
  const [_checked, setChecked] = useState<string[]>([]);
  const [changed, setChagned] = useState<TChanged>();
  // console.log('> ', disabled, checked, circleBox)

  // # onChange 함수가 있을 경우 전달
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(_checked);
    }
  }, [_checked]);

  // # 값 변경
  useEffect(() => {
    // console.log("> changed ", changed, _checked);
    // 초기화
    if (!changed) {
      const arr: string[] = [];
      items.map((a) => (a.checked && a.name && arr.push(a.name), a));
      setChecked(arr);
      return;
    }

    // 값 변경
    const { name, checked } = changed || {};

    // 추가
    if (checked) {
      setChecked([..._checked, name]);
    }
    // 삭제
    else {
      const findedIndex = _checked.findIndex((a: string) => a === name);
      const removed = [..._checked];
      removed.splice(findedIndex, 1);
      setChecked(removed);
    }
  }, [changed]);

  // # 체인지 이벤트. 스코프 문제로 직접 `_checked`에 반영이 불가.
  const handleChange = useCallback((e) => {
    const { name, checked } = e.currentTarget;
    setChagned({ name, checked });
  }, []);

  return (
    <div className={"carrot-ui-checkBoxGroup-root"} css={rootStyle}>
      {/* {JSON.stringify(_checked)} */}
      {items.map((item: TCheckBoxProps, i: number) => (
        <CheckBox {...item} onChange={handleChange} key={i} />
      ))}
    </div>
  );
}

// ===== styles
const rootStyle = css`
  display: inline-block;
  position: relative;
  & > div + div {
    margin-left: 8px;
  }
`;

// ===== export
export default CheckBoxGroup;
