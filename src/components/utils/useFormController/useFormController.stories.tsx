/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs } from "@storybook/addon-knobs";

import useFormController from "./useFormController";
import { TModel } from "../FormCreator/FormCreator";

// ===== export 정보
export default {
  title: "utils/useFormController",
  component: useFormController,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const { model } = useFormController({
    model: formModel,
    autoRegist: true,
  });

  return <div></div>;
};

// ===== model
const formModel: TModel = [
  {
    components: [
      {
        component: "Input",
        props: {
          name: "test_input",
        },
      },
    ],
  },
];
