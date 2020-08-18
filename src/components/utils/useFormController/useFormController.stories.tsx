/** @jsx jsx */
import React, { useRef } from "react";
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

import useFormController from "./useFormController";
import { TModel } from "../FormCreator/FormCreator";
import Input from "../../form/Input/Input";

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
