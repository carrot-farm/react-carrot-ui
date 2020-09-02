/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useCallback, useState, useEffect, useRef } from "react";

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
  /** 값 객들 */
  values: IValues;
  /** 저장된 값들 */
  savedValues: IValues;
  /** 폼 컨트롤을 위해 만든 객체 */
  control: IControl;
}

type TWatcher = (value: IValues) => void;

export interface IControl {
  /** _formValue 변경시 함수가 등록되어 있으면 실행 */
  watcher: React.MutableRefObject<TWatcher | undefined>;
  /** 모델 셋 함수 */
  setModel: (model: TModel) => void;
  /** register 함수 */
  register: (name: string, value: any) => void;
  /** 전체 모델을 순회하면서 자동으로 register 함수를 실행 */
  autoRegister: (mode: TModel) => void;
  /** 등록을 해제한다. */
  unregister: (key: string) => void;
  /** key / value 형태로 값을 변경한다. */
  setValue: (key: string, value: any) => void;
  /** 오브젝트 형태로 값을 변경한다. */
  setValues: (values: IValues) => void;
  /** 이벤트를 연결한다. */
  bindChange: TBindChange;
  /** 서브및을 연결한다. */
  bindSubmit: TBindSubmit;
}

type TBindChange = (
  f?: TBindF
) => (keyValue: { name: string; value: any }) => void;

type TBindF = (keyValue: {
  name: string;
  value: any;
}) => { name: string; value: any };

type TBindSubmit = (
  f?: (values: IValues) => void | false
) => (values: IValues) => void | false;

/** 값 객체 */
export interface IValues {
  [key: string]: any;
}

/** 모델의 키맵 */
export interface IModelKeyMap {
  [key: string]: number[];
}

/** 폼컨트롤러 커스텀 훅 */
function useFormController({
  autoRegist,
  model,
}: IUseFormControllerProps): IUseFormControllerReturn {
  const [_model, setModel] = useState<TModel>(model); // 외부에 노출되는 폼 모델
  const [_formValues, setFormValues] = useState<IValues>({}); // 폼의 전체 값을 저장.
  const [savedValues, setSavedValues] = useState<IValues>({}); // 저장한값
  const [modelKeyMap, setModelKeyMap] = useState<IModelKeyMap>({}); // 모델의 키 위치를 저장한다.
  const watcher = useRef<TWatcher>();
  const prevValues = useRef<IValues>();

  // # mount
  useEffect(() => {
    // console.log("> useFormController mount ");
    // autoRegister 등록
    if (autoRegist === true) {
      autoRegister(_model);
    }
  }, []);

  // # watch change `_formValue`
  useEffect(() => {
    // const diff: IValues = {};
    // let isDiff: boolean = false;
    // console.log("> call watch change: \n", isDiff, _formValues, prevValues);

    // watcher가 등록되어 있을 경우 실행.
    if (typeof watcher.current === "function") {
      watcher.current(_formValues);
    }

    // Object.keys(_formValues).map((k) => {
    //   if (_formValues[k] !== prevValues.current[k]) {
    //     isDiff = true;
    //     diff[k] = _formValues[k];
    //     const [i, j] = modelKeyMap[k];
    //     console.log("> diff: ", i, j, _model[i].components[j]);
    //     const changedComponent = _model[i].components[j];
    //     if (
    //       changedComponent.component !== "Button" &&
    //       changedComponent.component !== "IconButton"
    //     ) {
    //       _model[i].components[j].props.value = _formValues[k];
    //     }
    //   }
    //   return k;
    // });

    // console.log("> isDiff: \n", isDiff);
    // if (isDiff === true) {
    //   setModel(_model);
    // }

    // console.log("> diff: \n", modelKeyMap);

    // 이전 상태값 업데이트
    prevValues.current = { ..._formValues };
  }, [_formValues]);

  // # name과 value로 값을 등록하는 함수
  const register = useCallback(
    (name: string, value: any) => {
      // console.log("> register: ", name, value);
      setFormValues({
        ..._formValues,
        [name]: value,
      });
    },
    [_formValues]
  );

  // # 전체 모델을 순회하면서 자동으로 register 함수를 실행한다.
  const autoRegister = useCallback(
    (m: TModel) => {
      const _values: IValues = {};
      const _modelKeyMap: IModelKeyMap = {};

      mapModel((c, keyMap) => {
        if (c.props?.name) {
          _modelKeyMap[c.props.name] = keyMap;
          if (c.component === "Switch" || c.component === "CheckBox") {
            // console.log("> ", c.props.checked);
            _values[c.props.name] = c.props.value;
          } else if (c.component === "Input") {
            // console.log("> keyMap: ", c.props.name, keyMap);
            _values[c.props.name] = c.props.value || c.props.defaultValue;
          }
        }
        return c;
      }, m);

      // console.log("> autoRegister: \n", _values);
      // 값 저장
      setFormValues({
        ..._formValues,
        ..._values,
      });

      // 키맵 저장
      setModelKeyMap({
        ..._modelKeyMap,
      });
    },
    [_formValues]
  );

  // # 등록된 키/값을 제거한다.
  const unregister = useCallback((key: string) => {
    const obj: IValues = { ..._formValues };

    obj[key] && delete obj[key];
    setFormValues(obj);
  }, []);

  // # key / value로 값을 업데이트 한다.(동시에 여러개를 적용시 마지막 것만 적용된다.)
  const setValue = useCallback(
    (name: string, value: any) => {
      console.log("> _formValues: ", _formValues);
      console.log("> setValue(name / value): ", name, value);
      if (_formValues[name] === undefined) {
        return;
      }
      // console.log("> setValue: ", _formValues);
      // console.log("> setValue(name / value): ", name, value);

      setFormValues({
        ..._formValues,
        [name]: value,
      });

      // 모델 업데이트
      updateModel(name, value);
    },
    [_formValues]
  );

  // # 여러개의 key / value를 업데이트 한다.
  const setValues = useCallback(
    (_values: IValues, isSaveValues?: boolean) => {
      const newModel = [..._model];
      const filteredValues: IValues = {};

      // register로 등록되어 있는 값들만 추려 낸다.
      const filtered = Object.keys(_values).map((k) => {
        return _formValues[k] ? ((filteredValues[k] = _values[k]), k) : false;
      });

      // console.log("> setValues\n", _formValues, filtered, filteredValues);

      // 등록된 값과 일치하는게 없을 경우
      if (!filtered.length) {
        return;
      }

      // 저장여부
      if (isSaveValues === true) {
        setSavedValues(filteredValues);
      }

      // 값 업데이트
      setFormValues({
        ..._formValues,
        ...filteredValues,
      });

      Object.keys(filteredValues).map((name) => {
        const [i, j] = modelKeyMap[name];
        const changedComponent = newModel[i].components[j];

        if (
          changedComponent.component !== "Button" &&
          changedComponent.component !== "IconButton"
        ) {
          changedComponent.props.value = filteredValues[name];
        }
      });

      setModel(newModel);
    },
    [_formValues, _model, modelKeyMap]
  );

  // # setValue -> model 업데이트
  const updateModel = useCallback(
    (name: string, value: any) => {
      const [i, j] = modelKeyMap[name]; // 키맵
      const changedComponent = _model[i].components[j]; // 변경될 컴포넌트 모델

      // console.log("> updateModel: ", name, value, changedComponent);
      if (
        changedComponent.component !== "Button" &&
        changedComponent.component !== "IconButton"
      ) {
        changedComponent.props.value = value;
      }

      setModel([..._model]);
    },
    [_model, modelKeyMap]
  );

  // # 체인지 이벤트 연결
  const bindChange = useCallback<TBindChange>(
    (f) => ({ name, value }) => {
      // console.log("> bindChange: ", _formValues, name, value);
      if (f) {
        const newValue = f({ name, value });
        setValue(newValue.name, newValue.value);
        return;
      }

      setValue(name, value);
    },
    [_formValues]
  );

  // # 서브밋 이벤트 연결
  const bindSubmit = useCallback(
    (f) => (_values: IValues) => {
      // console.log("> bindSubmi: \n", _value);
      if (f && f(_values) === false) {
        return false;
      }

      clear(_formValues);
      return false;
    },
    [_formValues]
  );

  // # 전체 값을 삭제 한다.
  const clear = useCallback(
    (values: IValues) => {
      const clearValues: IValues = {};

      Object.keys(values).map((k) => {
        const type = typeof values[k];
        // console.log("> type", type);
        if (type === "boolean") {
          clearValues[k] = false;
        } else if (type === "number") {
          clearValues[k] = 0;
        } else if (type === "object") {
          Array.isArray(values[k])
            ? (clearValues[k] = [])
            : (clearValues[k] = {});
        } else {
          clearValues[k] = "";
        }
      });

      setValues(clearValues);
    },
    [setValues]
  );

  return {
    values: { ..._formValues },
    savedValues,
    model: _model,
    control: {
      watcher: watcher,
      setModel,
      register,
      autoRegister,
      unregister,
      setValue,
      setValues,
      bindChange,
      bindSubmit,
    },
  };
}

// ===== 함수
/**
 * 전체 함수 순회
 */
const mapModel = (
  f: (c: TComponent, arr: number[]) => any,
  model: TModel
): TModel =>
  model.map(
    (a, i: number) => (
      (a.components = a.components.map((b, j: number) => f(b, [i, j]))), a
    )
  );

export default useFormController;
