/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs } from "@storybook/addon-knobs";

import useFormController from "./useFormController";
import { TModel } from "../FormCreator/FormCreator";
import FormCreator from "../FormCreator/FormCreator";

// ===== export 정보
export default {
  title: "utils/useFormController",
  component: useFormController,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const { model, values, control } = useFormController({
    model: formModel,
    autoRegist: true,
  });

  console.log("> ", control);

  return (
    <div>
      {JSON.stringify(values)}
      <br />
      <FormCreator model={model} />
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
    ],
  },
];
