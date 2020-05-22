/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { InterpolationWithTheme } from '@emotion/core/types';
import * as icons from './svg';

import { BaseProps } from '../Base/Base';
import colors from '../../styles/colors';
import { TColorKeys } from '../../types/colors'


const iconSize = {
  xs: '14px',
  s: '20px',
  m: '25px',
  l: '30px',
  xl: '35px'
}

// ===== 타입
// # 아이콘 명
export type IconType = keyof typeof icons; // icons 객체가 가지는 key를 추출하여 타입으로 사용.
export const iconTypes: IconType[] = Object.keys(icons) as any []; // 스토리에서 불러오기 위함

// # 아이콘 사이즈
export type IconSizeType = keyof typeof iconSize;
export const iconSizeValues: IconSizeType[] = Object.keys(iconSize) as any [];

// # props type
type IconTPropsType = {
  /** icon 이름 */
  name: IconType;
  /** 아이콘 사이즈 */
  size?: IconSizeType;
  /** 아이콘 색상 */
  color?: TColorKeys;
};

// ===== 컴포넌트
/** xeicon svg convert */
function Icon({ 
  name,
  size = 's',
  color = 'black',
  ...args
}: IconTPropsType) {
  const SVGIcon = icons[name];

  return (
    <SVGIcon
      {...args}
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