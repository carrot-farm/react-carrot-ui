/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as icons from './svg';

import { BaseProps } from '../Base/Base';
import { ColorsType } from '../styles';
import colors from '../styles/colors';

const iconSize = {
  xs: '20px',
  s: '25px',
  m: '30px',
  l: '35px',
  xl: '40px'
}

// ===== 타입
// # 아이콘 명
type IconType = keyof typeof icons; // icons 객체가 가지는 key를 추출하여 타입으로 사용.
export const iconTypes: IconType[] = Object.keys(icons) as any []; // 스토리에서 불러오기 위함

// # 아이콘 사이즈
type IconSizeType = keyof typeof iconSize;
export const iconSizeValues: IconSizeType[] = Object.keys(iconSize) as any [];

// # props type
type IconTPropsType = {
  /** icon 이름 */
  name: IconType;
  /** 아이콘 사이즈 */
  size?: IconSizeType;
  /** 아이콘 색상 */
  color?: ColorsType;
};

// ===== 컴포넌트
/** xeicon svg convert */
function Icon({ 
  name,
  size = 's',
  color = 'black',
}: IconTPropsType) {
  const SVGIcon = icons[name];
  // console.log('> ', col)

  return (
    <SVGIcon
      css={{
        fill: colors[color],
        width: iconSize[size],
        height: "auto",
        transform: "scale(1, -1)",
      }}
    />
  );
}

// ===== 스타일


// ===== export
export default Icon;