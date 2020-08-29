/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, object } from "@storybook/addon-knobs";

import useFormController from "./useFormController";
import { TModel } from "../FormCreator/FormCreator";
import FormCreator from "../FormCreator/FormCreator";

// ===== export 정보
export default {
  title: "utils/useFormController",
  component: useFormController,
  decorators: [withKnobs],
};
let i = 0;

// ===== Default
export const Default = () => {
  const { model, values, control } = useFormController({
    model: formModel,
    autoRegist: true,
  });

  // setValue test
  const testSetValueClick = () => {
    // console.log("> click: ", values);
    control.setValue("test_switch", !values.test_switch);
  };

  const handleSetValuesClick = () => {
    control.setValues({
      test_input: values.test_input === "carrot" ? "당근" : "carrot",
      test_switch: !values.test_switch,
      test_checkbox: !values.test_checkbox,
      test_radio: values.test_radio === "carrot" ? "banana" : "carrot",
    });
  };

  return (
    <div>
      values: {JSON.stringify(values)}
      <br />
      {/* model: {JSON.stringify(model)} */}
      <br />
      <button onClick={testSetValueClick}>test setValue()</button>
      <br />
      <button onClick={handleSetValuesClick}>test setValues()</button>
      <br />
      <FormCreator model={model} control={control} />
    </div>
  );
};

// ===== model
const formModel: TModel = [
  {
    label: "input",
    components: [
      {
        component: "Input",
        props: {
          name: "test_input",
          defaultValue: "carrot",
        },
      },
      {
        component: "Switch",
        props: {
          name: "test_switch",
          value: true,
        },
      },
      {
        component: "CheckBox",
        props: {
          name: "test_checkbox",
          value: true,
        },
      },
      {
        component: "RadioGroup",
        props: {
          name: "test_radio",
          value: "apple",
          items: [
            { label: "carrot", value: "carrot" },
            { label: "banana", value: "banana" },
            { label: "apple", value: "apple" },
          ],
        },
      },
    ],
  },
];
