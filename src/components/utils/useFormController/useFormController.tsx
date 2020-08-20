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
export interface IReturnData {
  /** 폼 등록 레지스터 함수 */
  register: (name: string, value: any) => void;
  /** 컨트롤 가능한 폼 모델 */
  model: TModel;
}

/** 폼컨트롤러 커스텀 훅 */
function useFormController({
  autoRegist,
  model,
}: IUseFormControllerProps): IReturnData {
  const [_model, setModel] = useState<TModel>(model); // 외부에 노출되는 폼 모델
  const [_formValues, setFormValues] = useState({}); // 폼의 전체 값을 저장.

  // # mount
  useEffect(() => {
    // autoRegister 등록
    if (autoRegist === true) {
      autoRegister(_model);
    }
  }, []);

  // # name과 value로 값을 등록하는 함수
  const register = useCallback(
    (name, value) => {
      console.log("> register: ");
    },
    [_formValues]
  );

  // # 전체 모델을 순회하면서 자동으로 register 함수를 실행한다.
  const autoRegister = useCallback((m: TModel) => {
    return mapModel((c) => {
      if (c.props?.name) {
        if (c.component === "Switch") {
          console.log("> ", c.props.checked);
          // register(c.props.name, c.props.checked);
        } else {
          // register(c.props.name, c.props.value);
        }
      }
      return c;
    }, m);
  }, []);

  return { register, model: _model };
}

// ===== 함수
/**
 * 전체 함수 순회
 */
const mapModel = (f: (c: TComponent) => any, model: TModel): TModel =>
  model.map((a) => ((a.components = a.components.map((b) => f(b))), a));

export default useFormController;
