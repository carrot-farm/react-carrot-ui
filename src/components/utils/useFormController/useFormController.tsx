/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useCallback, useState, useEffect } from "react";

import { TModel, TComponent } from "../FormCreator/FormCreator";

/** props type */
export interface IUseFormControllerProps {
  /** 모델을 기준으로 자동 등록 */
  autoRegist?: boolean;
  /** 폼 모델 */
  model: TModel;
}

/** return type */
export interface IUseFormControllerReturn {
  /** 컨트롤 가능한 폼 모델 */
  model: TModel;
  /** 값 객체 */
  values: IValues;
  /** 폼 컨트롤을 위해 만든 객체 */
  control: IControl;
  /** 폼 등록 레지스터 함수 */
  register: (name: string, value: any) => void;
}

export interface IControl {
  /** 모델 셋 함수 */
  setModel: (model: TModel) => void;
  /** register 함수 */
  register: (name: string, value: any) => void;
  /** 전체 모델을 순회하면서 자동으로 register 함수를 실행 */
  autoRegister: (mode: TModel) => void;
  /** 등록을 해제한다. */
  unregister: (key: string) => void;
}

/** 값 객체 */
export interface IValues {
  [key: string]: any;
}

/** 폼컨트롤러 커스텀 훅 */
function useFormController({
  autoRegist,
  model,
}: IUseFormControllerProps): IUseFormControllerReturn {
  const [_model, setModel] = useState<TModel>(model); // 외부에 노출되는 폼 모델
  const [_formValues, setFormValues] = useState<IValues>({}); // 폼의 전체 값을 저장.

  // # mount
  useEffect(() => {
    // autoRegister 등록
    if (autoRegist === true) {
      autoRegister(_model);
    }
  }, []);

  // # name과 value로 값을 등록하는 함수
  const register = useCallback(
    (name: string, value: any) => {
      console.log("> register: ", name, value);
      setFormValues({
        ..._formValues,
        [name]: value,
      });
    },
    [_formValues]
  );

  // # 전체 모델을 순회하면서 자동으로 register 함수를 실행한다.
  const autoRegister = useCallback((m: TModel) => {
    const _values: IValues = {};

    mapModel((c) => {
      if (c.props?.name) {
        if (c.component === "Switch") {
          // console.log("> ", c.props.checked);
          _values[c.props.name] = c.props.checked;
        } else if (c.component === "Input") {
          // console.log("> ", c.props.value);
          _values[c.props.name] = c.props.value || c.props.defaultValue;
        }
      }
      return c;
    }, m);

    setFormValues({
      ..._formValues,
      ..._values,
    });
  }, []);

  // # 등록된 키/값을 제거한다.
  const unregister = useCallback((key: string) => {
    const obj: IValues = { ..._formValues };

    obj[key] && delete obj[key];
    setFormValues(obj);
  }, []);

  return {
    values: _formValues,
    register,
    model: _model,
    control: {
      setModel,
      register,
      autoRegister,
      unregister,
    },
  };
}

// ===== 함수
/**
 * 전체 함수 순회
 */
const mapModel = (f: (c: TComponent) => any, model: TModel): TModel =>
  model.map((a) => ((a.components = a.components.map((b) => f(b))), a));

export default useFormController;
