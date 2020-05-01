/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as icons from './svg'; // 하나의 객체로 불러옴.

type IconType = keyof typeof icons; // icons 객체가 가지는 key를 추출하여 타입으로 사용.["exit"|"headert"|"pencil"]
export const iconTypes: IconType[] = Object.keys(icons) as any []; // 스토리에서 불러오기 위함

export type IconProps = {
  /** 아이콘 타입 */
  icon: IconType;
  /** 아이콘 색상 */
  color?: string;
  /** 아이콘 크기 */
  size?: string | number;
  /** 추가 클래스 */
  className?: string;
}

const Icon = ({ icon, color, size, className }: IconProps) => {
  const SVGIcon = icons[icon];
  return (
    <SVGIcon 
      css={{ fill: color || 'currentColor', width: size, height: 'auto' }}
      className={className}
    />
  )
};

export default Icon;