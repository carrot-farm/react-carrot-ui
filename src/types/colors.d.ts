import colors, { mainColors } from '../styles/colors';

// # 색상의 키값 유니온 타입
export type TColorKeys = keyof typeof colors;

// export type TColors = keyof typeof colors;
// export type TColors = {
//   "white": string; 
//   "black": string;
//   "transparent": string;

//   "grey": string;
//   'grey-darken-1' : string;
//   'grey-darken-2': string;
//   'grey-darken-3': string;
//   'grey-darken-4': string;
//   'grey-lighten-1': string;
//   'grey-lighten-2': string;
//   'grey-lighten-3': string;
//   'grey-lighten-4': string;
//   'grey-lighten-5': string;

//   "red": string;
//   'red-darken-1': string;
//   'red-darken-2': string;
//   'red-darken-3': string;
//   'red-darken-4': string;
//   'red-lighten-1': string;
//   'red-lighten-2': string;
//   'red-lighten-3': string;
//   'red-lighten-4': string;
//   'red-lighten-5': string;

//   "pink": string;
//   'pink-darken-1': string;
//   'pink-darken-2': string;
//   'pink-darken-3': string;
//   'pink-darken-4': string;
//   'pink-lighten-1': string;
//   'pink-lighten-2': string;
//   'pink-lighten-3': string;
//   'pink-lighten-4': string;
//   'pink-lighten-5': string;

//   "grape": string;
//   'grape-darken-1': string;
//   'grape-darken-2': string;
//   'grape-darken-3': string;
//   'grape-darken-4': string;
//   'grape-lighten-1': string;
//   'grape-lighten-2': string;
//   'grape-lighten-3': string;
//   'grape-lighten-4': string;
//   'grape-lighten-5': string;

//   "violet": string;
//   'violet-darken-1': string;
//   'violet-darken-2': string;
//   'violet-darken-3': string;
//   'violet-darken-4': string;
//   'violet-lighten-1': string;
//   'violet-lighten-2': string;
//   'violet-lighten-3': string;
//   'violet-lighten-4': string;
//   'violet-lighten-5': string;

//   "indigo": string;
//   'indigo-darken-1': string;
//   'indigo-darken-2': string;
//   'indigo-darken-3': string;
//   'indigo-darken-4': string;
//   'indigo-lighten-1': string;
//   'indigo-lighten-2': string;
//   'indigo-lighten-3': string;
//   'indigo-lighten-4': string;
//   'indigo-lighten-5': string;

//   "blue": string;
//   'blue-darken-1': string;
//   'blue-darken-2': string;
//   'blue-darken-3': string;
//   'blue-darken-4': string;
//   'blue-lighten-1': string;
//   'blue-lighten-2': string;
//   'blue-lighten-3': string;
//   'blue-lighten-4': string;
//   'blue-lighten-5': string;

//   "cyan": string;
//   'cyan-darken-1': string;
//   'cyan-darken-2': string;
//   'cyan-darken-3': string;
//   'cyan-darken-4': string;
//   'cyan-lighten-1': string;
//   'cyan-lighten-2': string;
//   'cyan-lighten-3': string;
//   'cyan-lighten-4': string;
//   'cyan-lighten-5': string;

//   "teal": string;
//   'teal-darken-1': string;
//   'teal-darken-2': string;
//   'teal-darken-3': string;
//   'teal-darken-4': string;
//   'teal-lighten-1': string;
//   'teal-lighten-2': string;
//   'teal-lighten-3': string;
//   'teal-lighten-4': string;
//   'teal-lighten-5': string;

//   "green": string;
//   'green-darken-1': string;
//   'green-darken-2': string;
//   'green-darken-3': string;
//   'green-darken-4': string;
//   'green-lighten-1': string;
//   'green-lighten-2': string;
//   'green-lighten-3': string;
//   'green-lighten-4': string;
//   'green-lighten-5': string;

//   "lime": string;
//   'lime-darken-1': string;
//   'lime-darken-2': string;
//   'lime-darken-3': string;
//   'lime-darken-4': string;
//   'lime-lighten-1': string;
//   'lime-lighten-2': string;
//   'lime-lighten-3': string;
//   'lime-lighten-4': string;
//   'lime-lighten-5': string;

//   "yellow": string;
//   'yellow-darken-1': string;
//   'yellow-darken-2': string;
//   'yellow-darken-3': string;
//   'yellow-darken-4': string;
//   'yellow-lighten-1': string;
//   'yellow-lighten-2': string;
//   'yellow-lighten-3': string;
//   'yellow-lighten-4': string;
//   'yellow-lighten-5': string;

//   "orange": string;
//   'orange-darken-1': string;
//   'orange-darken-2': string;
//   'orange-darken-3': string;
//   'orange-darken-4': string;
//   'orange-lighten-1': string;
//   'orange-lighten-2': string;
//   'orange-lighten-3': string;
//   'orange-lighten-4': string;
//   'orange-lighten-5': string;
// };


// ===== 메인 색상
// # 서브 색상을 제외한 주요 색상
// export type TMainColors = {
//   "white": string;
//   "balck": string;
//   "transparent": string;
//   "grey": string;
//   "red": string;
//   "pink": string;
//   "grape": string;
//   "violet": string;
//   "indigo": string;
//   "blue": string;
//   "cyan": string;
//   "teal": string;
//   "green": string;
//   "lime": string;
//   "yellow": string;
//   "orange": string;
// };

// # 메인 색상의 키값의 유니온 타입
export type TMainColorKeys = keyof typeof mainColors;

// # 메인 색상의 키 배열 타입
export const TMainColorArr: TMainColorKeys[] = Object.keys(TMainColors) as any[];