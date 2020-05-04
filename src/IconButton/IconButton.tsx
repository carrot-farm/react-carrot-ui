/** @jsx jsx */
import { useRef, useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import gsap from 'gsap';

import Base, { BaseProps } from '../Base/Base';
import Button from '../Button/Button';
import Icon, { IconType, IconSizeType } from '../Icon/Icon';
import { ColorsType } from '../styles';

// ===== 타입
/** props type */
type IconButtonPropsType = {
  /** 버튼 타입 */
  type?: "button"|"submit";
  /** 아이콘명 */
  iconName: IconType;
  /** 아이콘 색상과 보더의 색상 */
  color?: ColorsType;
  /** 배경 색상 */
  backgroundColor?: ColorsType;
  /** hvoer시 색상 */
  hoverColor?: ColorsType;
  /** 클릭시 웨이브 컬럭 */
  rippleColor?: ColorsType;
  /** 원형 버튼 여부 */
  circleButton?: boolean;
  /** border여부 */
  border?: boolean;
  /** size */
  size?: "s" | "m" | "l";
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

// ===== 컴포넌트
/** 모바일 상단의 메뉴 등에서 사용 */
function IconButton({
  type = 'button',
  iconName,
  color = 'black',
  backgroundColor = 'transparent',
  hoverColor = 'transparent',
  rippleColor = 'grey-lighten-1',
  circleButton = true,
  border = true,
  size = 'm',
  disabled,
  onClick,
  ...args
}: IconButtonPropsType) {
  let iSize: IconSizeType = "s";
  
  // # 사이즈 값에 따른 아이콘 사이즈
  if(size === 's') {
    iSize = 'xs';
  } else if(size === 'm') {
    iSize = 's';
  } else if(size === 'l') {
    iSize = 'm';
  }

  return (
    <Button
      {...args}
      type={"button"}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      rippleColor={rippleColor}
      border={border}
      borderColor={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      borderRadius={'50%'}
      square={true}
    >
      <Icon name={'home'} color={color} size={iSize} />
    </Button>
  );
}


// ===== styles


// ===== export
export default IconButton;