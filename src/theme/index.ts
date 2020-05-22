import React from 'react';
import { TThemeContext, TThemeState } from '../types/theme'
import { TColorKeys, TMainColorKeys } from '../types/colors';
import { mainColors } from '../styles/colors';

// ===== 타입 정의
// export type ThemeStateType = {
//   primaryColor?: TMainColors;
//   secondaryColor?: TMainColors;
//   baseUnit?: number;
// };

// type SubScribeFunc = (prevState: ThemeStateType, currentState: ThemeStateType) => void;
// type SubScribesType = Array<SubScribeFunc>;

// ===== state 정의
// export const initialState = {
//   primaryColor: 'blue',
//   secondaryColor: 'red',
//   baseUnit: 5
// } as const;

// ===== 메인 색상에 따라 관련 색상 생성
export const createSubColors = (mainColor: TMainColorKeys, isSecondaryColor?: boolean) => {
  const subColors: {[key: string]: string} = {}
  const prefix = isSecondaryColor ? 'secondary' : 'primary';

  if(mainColor === 'white' || mainColor === 'transparent') {
    subColors[`${prefix}TextColor`] = 'black';
    subColors[`${prefix}BorderColor`] = 'black';
    subColors[`${prefix}DarkenColor`] = mainColor;
    subColors[`${prefix}LightenColor`] = mainColor;
    subColors[`${prefix}RippleColor`] = 'grey-lighten-3';
  } else {
    subColors[`${prefix}TextColor`] = 'white';
    subColors[`${prefix}BorderColor`] = mainColor;
    subColors[`${prefix}DarkenColor`] = `${mainColor}-darken-2`;
    subColors[`${prefix}LightenColor`] = `${mainColor}-lighten-3`;
    subColors[`${prefix}RippleColor`] = `${mainColor}-lighten-3`;
  }

  return subColors
}

// ===== 테마 색상
export const themes: TThemeState = {
  primaryColor: 'blue',
  ...createSubColors('blue'),
  secondaryColor: 'red',
  ...createSubColors('red', true),
  baseUnit: 5
};

// ===== theme context
const ThemeContext = React.createContext<TThemeContext>({
  theme: themes,
  onChangePrimaryColor: () => {},
});



// ===== 테마 스토어 생성 함수
// const createTheme = (themState: ThemeStateType = {}) => {
//   let state = {
//     ...initialState,
//     ...themState
//   };
//   console.log('> ', state)

//   const subscribes: SubScribesType = [];

//   return () => ({
//     setTheme: (s: ThemeStateType) => {
//       const changedState = {
//         ...state,
//         ...s
//       }
//       if(subscribes.length) {
//         for(const f of subscribes) {
//           f(state, changedState);
//         }
//       }
//       state = changedState;
//       return ({...state})
//     },

//     getTheme:  () => (console.log('> get Theme: \n', state), {...state}),

//     setPrimaryColor: (color:ColorsType) => 
//       changeState('primaryColor', color, state, subscribes),

//     setSecondaryColor: (color:ColorsType) => 
//       changeState('secondaryColor', color, state, subscribes),

//     setBaseUnit: (unit:number) => 
//       changeState('baseUnit', unit, state, subscribes),

//     // # 변경 시 구동
//     addSubscribe: (func: SubScribeFunc) => {
//       subscribes.push(func);
//     },

//     // # state와 지정된 함수와의 다른 점이 있을 때 콜백 실행
//     isChangeOnce: (t: ThemeStateType, f: () => void) => {
//       let a: keyof ThemeStateType; 
//       let sw = false;

//       for(a in t) {
//         if(t[a] !== state[a] && f && sw === false) {
//           f();
//           sw = true;
//           break;
//         }
//       }
//     }

//   });
// };

// ===== 상태 변경
// const changeState = (key: keyof ThemeStateType, value: any, state: ThemeStateType, subscribes: SubScribesType) => {
//   if(state[key] === value){
//     return ({...state})
//   }
//   const changedState = {
//     ...state,
//     [key]: value
//   }

//   if(subscribes.length) {
//     for(const f of subscribes) {
//       f(state, changedState);
//     }
//   }

//   // state = ({...changedState});
//   state = changedState;

//   // console.log('> is Equal : ', state === changedState)

//   return ({...state});
// }

// const theme = createTheme()();




// ===== export
export default ThemeContext;