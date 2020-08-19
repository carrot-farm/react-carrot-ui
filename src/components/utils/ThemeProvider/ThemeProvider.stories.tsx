/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  withKnobs,
  boolean,
  text,
  number,
  object,
  select,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ThemeProvider from "./ThemeProvider";
import Button from "../../Button/Button";
import Input from "../../form/Input/Input";
import IconButton from "../../IconButton/IconButton";
import CheckBox from "../../form/CheckBox/CheckBox";
// import CheckBox from "~/components/form/CheckBox/CheckBox";
import Radio from "../../Radio/Radio";
import Switch from "../../form/Switch/Switch";
import TextField from "../../TextField/TextField";
import { mainColors } from "../../../styles/colors";

// ===== export 정보
export default {
  title: "utils/ThemeProvider",
  component: ThemeProvider,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const mainColorKeyArr = getKeyArr(mainColors);
  const props = {
    primaryColor: select("primaryColor", mainColorKeyArr, "orange"),
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
        <Input type="text" value="당근" onChange={action("inputOnChange")} />
      </div>
      <div>
        <CheckBox checked onChange={action("checkBoxOnChange")} />
      </div>
      <div>
        <Radio checked onChange={action("radioOnChange")} />
      </div>
      <div>
        <Switch checked onChange={action("switchOnChange")} />
      </div>
      <div>
        <TextField />
      </div>
    </ThemeProvider>
  );
};

// ===== 메인 색상 키 배열
const getKeyArr = (obj: any) => {
  const arr = [];
  for (const k in obj) {
    arr.push(k);
  }
  return arr;
};
