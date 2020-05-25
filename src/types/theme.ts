import { TMainColorKeys, TColorKeys } from './colors';

// 테마의 속성 정의
export type TThemeState = {
  primaryColor?: TMainColorKeys;
  primaryTextColor?: TColorKeys;
  primaryBorderColor?: TColorKeys;
  primaryDarkenColor?: TColorKeys;
  primaryLightenColor?: TColorKeys;
  primaryRippleColor?: TColorKeys;

  secondaryColor?: TMainColorKeys;
  secondaryTextColor?: TColorKeys;
  secondaryBorderColor?: TColorKeys;
  secondaryDarkenColor?: TColorKeys;
  secondaryLightenColor?: TColorKeys;
  secondaryRippleColor?: TColorKeys;

  baseUnit?: number;
};

// # 테마 state 타입
export type TThemeContext = {
  theme: TThemeState;
  onChangePrimaryColor: (color: TMainColorKeys) => void
};