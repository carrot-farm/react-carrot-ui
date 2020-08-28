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
    control.setValue("test_input", "달걀");
  };

  return (
    <div>
      values: {JSON.stringify(values)}
      <br />
      {/* model: {JSON.stringify(model)} */}
      <br />
      <button onClick={testSetValueClick}>test setValue()</button>
      <br />
      <FormCreator model={object("Model", model)} control={control} />
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
          defaultValue: "input_defaultValue",
        },
      },
      {
        component: "Switch",
        props: {
          name: "test_switch",
          value: true,
        },
      },
      // {
      //   component: "CheckBox",
      //   props: {
      //     name: "test_checkbox",
      //     value: true,
      //   },
      // },
      // {
      //   component: "RadioGroup",
      //   props: {
      //     name: "test_radio",
      //     items: [
      //       { label: "carrot", value: "carrot" },
      //       { label: "banana", value: "banana" },
      //       { label: "apple", value: "apple" },
      //     ],
      //   },
      // },
    ],
  },
];
