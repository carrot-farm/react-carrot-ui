/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  number,
  object,
  select,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import ThemeProvider from './ThemeProvider';
import Button from '../Button/Button';
import Input from '../Input/Input';
import IconButton from '../IconButton/IconButton';
import CheckBox from '../CheckBox/CheckBox';
import { mainColors } from '../../styles/colors'

// ===== export 정보
export default {
  title: 'components|ThemeProvider',
  component: ThemeProvider,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const mainColorKeyArr = getKeyArr(mainColors);
  const props = {
    primaryColor: select('primaryColor', mainColorKeyArr, 'orange'),
  };

  return (
    <ThemeProvider {...props}>
      <div>
        <Button>Button</Button>
      </div>
      <div>
        <IconButton iconName="home" />
      </div>
      <div>
        <Input type="text" value="당근" onChange={action('inputOnChange')} />
      </div>
      <div>
        <CheckBox checked onChange={action('checkBoxOnChange')} />
      </div>
    </ThemeProvider>
  );
};

// ===== 메인 색상 키 배열
const getKeyArr = (obj: any) => {
  const arr = []
  for(const k in obj){
    arr.push(k)
  }
  return arr;
}