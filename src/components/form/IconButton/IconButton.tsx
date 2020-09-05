/** @jsx jsx */
import { jsx } from "@emotion/core";

// import Base, { BaseProps } from '../Base/Base';
import Button from "../Button/Button";
import Icon, { IconType, IconSizeType } from "../../others/Icon/Icon";
import { TColorKeys, TMainColorKeys } from "../../../types/colors";
import ThemeContext from "../../../theme";

// ===== 타입
/** props type */
export type TIconButtonProps = {
  /** buttonCreator에서 구분을 위함. */
  name?: string;
  /** 버튼 타입 */
  type?: "button" | "submit";
  /** 아이콘명 */
  iconName: IconType;
  /** 아이콘 색상과 보더의 색상 */
  color?: TColorKeys;
  /** 배경 색상 */
  backgroundColor?: TMainColorKeys;
  /** hvoer시 색상 */
  hoverColor?: TColorKeys;
  /** 클릭시 웨이브 컬럭 */
  rippleColor?: TColorKeys;
  /** 원형 버튼 여부 */
  circleButton?: boolean;
  /** border여부 */
  border?: boolean;
  /** size */
  size?: "s" | "m" | "l";
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => any;
};

// ===== 컴포넌트
/** 모바일 상단의 메뉴 등에서 사용 */
function IconButton({
  name,
  type = "button",
  iconName,
  color,
  backgroundColor,
  hoverColor,
  rippleColor,
  circleButton = true,
  border,
  size = "m",
  disabled,
  onClick,
  ...args
}: TIconButtonProps) {
  let iSize: IconSizeType = "s";

  // # 사이즈 값에 따른 아이콘 사이즈
  if (size === "s") {
    iSize = "xs";
  } else if (size === "m") {
    iSize = "s";
  } else if (size === "l") {
    iSize = "m";
  }

  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        const _backgroundColor = backgroundColor || theme.primaryColor;
        const _hoverColor =
          hoverColor || (theme.primaryDarkenColor as TColorKeys);
        const _color = color || (theme.primaryTextColor as TColorKeys);
        const _rippleColor =
          rippleColor || (theme.primaryRippleColor as TColorKeys);

        return (
          <Button
            {...args}
            name={name}
            type={type}
            color={_color}
            backgroundColor={_backgroundColor}
            hoverColor={_hoverColor}
            rippleColor={_rippleColor}
            border={border}
            borderColor={_color}
            size={size}
            disabled={disabled}
            onClick={onClick}
            borderRadius={circleButton ? "50%" : "0"}
            square={true}
          >
            <Icon name={iconName} color={_color} size={iSize} />
          </Button>
        );
      }}
    </ThemeContext.Consumer>
  );
}

// ===== styles

// ===== export
export default IconButton;
