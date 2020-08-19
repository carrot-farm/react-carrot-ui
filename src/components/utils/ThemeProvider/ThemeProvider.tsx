/** @jsx jsx */
import * as React from "react";
import { useEffect, useState } from "react";
import { jsx } from "@emotion/core";

// import theme, { ThemeStateType } from '../../theme';
import ThemeContext, { themes, createSubColors } from "../../../theme";
import { TMainColorKeys } from "../../../types/colors";
import { TThemeContext, TThemeState } from "../../../types/theme";

// ===== 타입정의
export type ThemeProdiverType = TThemeState & {
  /** children */
  children: React.ReactNode;
};

// ===== 컴포넌트
function ThemeProvider({
  primaryColor,
  secondaryColor,
  children,
}: ThemeProdiverType) {
  // # primary color 변경
  const handleChangePrimaryColor = (color: TMainColorKeys) => {
    setState({
      ...state,
      theme: {
        ...state.theme,
        primaryColor: color,
        ...createSubColors(color),
      },
    });
  };

  // # 상태 결정
  const [state, setState] = useState<TThemeContext>({
    theme: {
      primaryColor: primaryColor || themes.primaryColor,
      ...createSubColors(primaryColor || themes.primaryColor!),
      secondaryColor: secondaryColor || themes.secondaryColor,
      ...createSubColors(secondaryColor || themes.secondaryColor!, true),
      baseUnit: themes.baseUnit,
    },
    onChangePrimaryColor: handleChangePrimaryColor,
  });

  // console.log('> state : ', state)

  // # props 변경시
  useEffect(() => {
    setState({
      ...state,
      theme: {
        ...state.theme,
        primaryColor: primaryColor || state.theme.primaryColor!,
        ...createSubColors(primaryColor || state.theme.primaryColor!),
        secondaryColor: secondaryColor || state.theme.secondaryColor!,
        ...createSubColors(secondaryColor || state.theme.secondaryColor!, true),
      },
    });
  }, [primaryColor, secondaryColor]);
  // const themeState = useMemo<ThemeStateType>(() => theme.getTheme(), []);

  // theme.isChangeOnce(themeState, () => {
  //   theme.setTheme(themeState);
  // });

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
