/** @jsx jsx */
import * as React from "react";
import { useEffect } from "react";
import { useState, useMemo, useCallback } from "react";
import { jsx, css } from "@emotion/core";

import { media, getColor } from "../../../styles";
import * as formComponents from "../../../formComponents";
import { IControl } from "../useFormController/useFormController";
import Input, { TInputProps } from "../../form/Input/Input";
import TextField, { TTextFieldProps } from "../../form/TextField/TextField";
import Radio, { TRadioProps } from "../../form/Radio/Radio";
import RadioGroup, { TRadioGroupProps } from "../../form/RadioGroup/RadioGroup";
import Select, { OptionsType, TSelectProps } from "../../form/Select/Select";
import Switch, { TSwitchProps } from "../../form/Switch/Switch";
import CheckBox, { TCheckBoxProps } from "../../form/CheckBox/CheckBox";
import Button, { TButtonProps } from "../../form/Button/Button";
import IconButton, { TIconButtonProps } from "../../form/IconButton/IconButton";

// ===== 타입정의
// # 메인 컴포넌트 타입
export type TFormCreator = {
  /** 폼을 동적으로 생성할 모델 */
  model: TModel;
  /** 모바일 이상의 사이즈에서 라벨의 넓이 */
  labelWidth?: string;
  /** onSubmit 후 폼의 초기화 여부*/
  reset?: boolean;
  /** 라벨의 정렬 방향 */
  direction?: Tdirection;
  /** 폼 요소의 체인지 이벤트. false 리턴시 업데이트 안함 */
  onChanges?: TOnChanges;
  /** 버튼의 클릭 이벤트 */
  onClicks?: TOnClicks;
  /** 폼 엘리먼트 참조 */
  formRef?: React.RefObject<HTMLFormElement>;
  /** useFormController의 control */
  control?: IControl;
  /** 폼의 서브밋 이벤트 */
  onSubmit?: TOnSubmit;
  /** 폼의 체인지 이벤트. 전체 이벤트를 캐치 */
  onChange?: (
    { name, value }: { name: string; value: any },
    {
      e,
      component,
      model,
    }: {
      e: TChangeEvent;
      component: TComponent;
      model: TModel;
    }
  ) => void;
};

// # 라벨 정렬 방향
type Tdirection = "vertical" | "horizontal";

// # 폼 요소의 체인지 이벤트
type TOnChanges = {
  [name: string]: ({
    e,
    component,
    model,
  }: {
    e: TChangeEvent;
    component: TComponent;
    model: TModel;
  }) => void | false;
};

// # 버튼 클릭 이벤트
type TOnClicks = {
  [name: string]: ({
    e,
    component,
    model,
  }: {
    e: React.MouseEvent<HTMLButtonElement>;
    component: TComponent;
    model: TModel;
  }) => void | false;
};

/** 서브및 이벤트 */
type TOnSubmit = (values: TValues) => void | false;

// # 이벤트 타입
type TChangeEvent = React.ChangeEvent<HTMLInputElement> & OptionsType;

// # 결과 값들
type TValues = { [key: string]: any };

// # 가격
// type TModel = any[];
export type TModel = TRow[];

type TRow = {
  /** label */
  label?: string;
  /** row에 대한 스타일 */
  style?: TSTyle;
  /** form input 요소에 대한 스타일 */
  componentsStyle?: TSTyle;
  /** 폼 요소의 배열 */
  components: TComponent[];
};

// type TComponent = {
//   /** 컴포넌트 요소 */
//   component: keyof typeof formComponents,
//   /** 컴포넌트 엘리먼트의 스타일링 */
//   style?: TSTyle,
//   /** 컴포넌트에 전달할 props */
//   props: TProps
// }

type TSTyle = { [key: string]: string } | string;

type TBaseComponent = {
  style?: TSTyle;
};
type TInputComponent = TBaseComponent & {
  component: "Input";
  props: TInputProps;
};
type TSelectComponent = TBaseComponent & {
  component: "Select";
  props: TSelectProps;
};
type TTextFieldComponent = TBaseComponent & {
  component: "TextField";
  props: TTextFieldProps;
};
type TRadioComponent = TBaseComponent & {
  component: "Radio";
  props: TRadioProps;
};
type TRadioGroupComponent = TBaseComponent & {
  component: "RadioGroup";
  props: TRadioGroupProps;
};
type TSwitchComponent = TBaseComponent & {
  component: "Switch";
  props: TSwitchProps;
};
type TCheckBoxComponent = TBaseComponent & {
  component: "CheckBox";
  props: TCheckBoxProps;
};
type TButtonComponent = TBaseComponent & {
  component: "Button";
  props: TButtonProps;
};
type TIconButtonComponent = TBaseComponent & {
  component: "IconButton";
  props: TIconButtonProps;
};

// # 컴포넌트 타입
export type TComponent =
  | TInputComponent
  | TSelectComponent
  | TTextFieldComponent
  | TRadioComponent
  | TRadioGroupComponent
  | TSwitchComponent
  | TCheckBoxComponent
  | TButtonComponent
  | TIconButtonComponent;

// # 폼 크리에이터의 props
type TFormComponentsProps = {
  componentInfo: TComponent;
  parentIndex: number;
  childIndex: number;
  onChange: (
    e: TChangeEvent,
    componentInfo: TComponent,
    parentIndex: number,
    childIndex: number
  ) => any;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    componentInfo: TComponent,
    parentIndex: number,
    childIndex: number
  ) => any;
};

// ===== 컴포넌트
/** 폼을 동적으로 생성한다. */
function FormCreator({
  model,
  labelWidth = "150px",
  reset = true,
  direction = "horizontal",
  onChanges,
  onClicks,
  formRef,
  control,
  values,
  onSubmit,
  onChange,
}: TFormCreator) {
  // const $form = useRef<HTMLFormElement>(null);
  const [_model, setModel] = useState<TModel>(model);

  // # mount
  useEffect(() => {
    // console.log("> FormCreator mount: \n", control);
    // if (control?.watcher.current) {
    //   control.watcher.current = (values) => console.log("> values: ", values);
    // }
  }, []);

  useEffect(() => {
    // console.log("> watch value: ", values);
  }, [values]);

  // # 변경 이벤트 핸들러
  const handleChnage = (
    e: TChangeEvent,
    a: TComponent,
    parentIndex: number,
    childIndex: number
  ) => {
    const el = e.currentTarget; // 이벤트 엘리먼트
    const newModel = [..._model];
    const component = newModel[parentIndex].components[childIndex];

    // 값 변경 컴포넌트에 반영
    if (
      component.component === "Switch" ||
      component.component === "CheckBox"
    ) {
      component.props.value = el.checked;
    } else if (component.component === "Select") {
      component.props.value = e.value;
    } else if (component.component === "Radio") {
      newModel[parentIndex].components.forEach((b: TComponent) => {
        if (b.component === "Radio") {
          b.props.checked = b.props.value === el.value;
        }
      });
    } else if (component.component === "RadioGroup") {
      // console.log("> radio group change: ", component.props.value, el.value);
      component.props.value = el.value;
    } else if (
      component.component === "Input" ||
      component.component === "TextField"
    ) {
      component.props.value = el.value;
    }

    // 이벤트 핸들러 실행.
    if (
      onChanges &&
      onChanges[component.props.name!] &&
      onChanges[component.props.name!]({ e, component: a, model: _model }) ===
        false
    ) {
      return false;
    }

    // # change 이벤트
    if (
      onChange &&
      component.props.name &&
      component.component !== "Button" &&
      component.component !== "IconButton"
    ) {
      console.log("> values: ", values);
      onChange(
        { name: component.props.name, value: component.props.value },
        {
          e,
          component: a,
          model: _model,
        }
      );
    }

    // 컨트롤러가 있을 때 변경 값 반영
    if (
      control?.setValue &&
      component.props.name &&
      component.component !== "Button" &&
      component.component !== "IconButton"
    ) {
      console.log(
        "> FormCreator.handleChnage \n",
        component,
        "\n",
        component.props.name,
        component.props.value
      );
      control.setValue(component.props.name, component.props.value);
    }

    setModel(newModel);
  };

  // # 클릭 이벤트
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    a: TComponent,
    parentIndex: number,
    childIndex: number
  ) => {
    const newModel = [..._model];
    const component = newModel[parentIndex].components[childIndex];
    // const props = component.props;

    // // # input등에서 submit 발생시 `slosh`차단
    // if(e.nativeEvent.clientX === 0 && e.nativeEvent.clientY === 0) {
    //   e.stopPropagation(); // 이벤트 버블링 차단
    // }

    // # 연결되어 있는 클릭 함수 실행
    if (onClicks && onClicks[component.props.name!]) {
      onClicks[component.props.name!]({ e, component: a, model: _model });
    }
  };

  // # submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('> handle submit')

    if (onSubmit && onSubmit(getValues(_model)) === false) {
      return false;
    }

    if (reset) {
      setModel(clearModel(model));
    }
    // return true;
  };

  // # root style
  const rootStyleMemo = useCallback(
    (direction: Tdirection, style?: TSTyle) => () => [
      rowStyle,
      rowStyleS,
      rowStyleM(direction),
      style && styleFn(style),
    ],
    []
  );

  // # label style
  const labelSTyleMemo = useCallback(
    (labelWidth: string) => () => [
      labelStyle,
      labelStyleS,
      labelStyleM(labelWidth),
    ],
    []
  );

  // # component Style
  const styleMemo = useCallback((style) => () => [style && styleFn(style)], []);

  return (
    <form className="carrot-ui-form" ref={formRef} onSubmit={handleSubmit}>
      {_model.map((a, i) => (
        <div
          className="form-row"
          key={`form-creator-${i}`}
          css={rootStyleMemo(direction, a.style)}
        >
          <div className="form-label" css={labelSTyleMemo(labelWidth)}>
            {a.label}
          </div>
          <div
            className="form-component-wrapper"
            css={styleMemo(a.componentsStyle)}
          >
            {JSON.stringify(values)}
            {a.components.map((c: TComponent, j: number) => (
              <React.Fragment>
                {/* <Input onChange={() => console.log("> input; ", values)} /> */}
                <FormComponents
                  componentInfo={c}
                  parentIndex={i}
                  childIndex={j}
                  onChange={handleChnage}
                  onClick={handleClick}
                  key={`form-component-${j}`}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}

// ===== form 요소 컴포넌트
const FormComponents = ({
  componentInfo,
  parentIndex,
  childIndex,
  onChange,
  onClick,
}: TFormComponentsProps) => {
  const { component: componentName } = componentInfo;
  // const Component = formComponents[componentInfo.component] as any;
  let Component: any;

  if (componentName === "Button") {
    Component = Button;
  } else if (componentName === "IconButton") {
    Component = IconButton;
  } else if (componentName === "CheckBox") {
    Component = CheckBox;
  } else if (componentName === "Input") {
    Component = Input;
  } else if (componentName === "Select") {
    Component = Select;
  } else if (componentName === "Radio") {
    Component = Radio;
  } else if (componentName === "RadioGroup") {
    Component = RadioGroup;
  } else if (componentName === "Switch") {
    Component = Switch;
  } else if (componentName === "TextField") {
    Component = TextField;
  }

  // # 클릭 이벤트 핸들러
  const handleClick = useCallback(
    (e: any) => onClick && onClick(e, componentInfo, parentIndex, childIndex),
    [componentInfo, parentIndex, childIndex]
  );

  // # 체인지 이벤트 핸들러
  const handleChange = useCallback(
    (e: any) => onChange(e, componentInfo, parentIndex, childIndex),
    [componentInfo, parentIndex, childIndex]
  );

  // # 스타일
  const rootStyeMemo = useMemo(
    () => [
      formComponentStyle,
      componentInfo.style && styleFn(componentInfo.style),
    ],
    [formComponentStyle, componentInfo]
  );

  // console.log("> ", componentInfo.props);

  return (
    <div className="form-component" css={rootStyeMemo}>
      {componentName === "Button" || componentName === "IconButton" ? (
        <Component {...componentInfo.props} onClick={handleClick} />
      ) : (
        <Component {...componentInfo.props} onChange={handleChange} />
      )}
    </div>
  );
};

// ===== 함수
const getValues = (model: TModel): TValues => {
  const values: any = {};

  for (const a of model) {
    for (const b of a.components) {
      if (
        b.props.name &&
        b.component !== "Button" &&
        b.component !== "IconButton"
      ) {
        if (b.component === "Switch") {
          values[b.props.name] = b.props.value;
        } else if (b.component === "Radio" && b.props.checked) {
          values[b.props.name] = b.props.value;
        } else {
          values[b.props.name] = b.props.value;
        }
      }
    }
  }

  // console.log('> ', values);
  return values;
};
// # 폼의 값 초기화
const clearModel = (model: TModel): TModel => {
  const newModel = [...model];
  let firstRadioName = "";

  for (const a of newModel) {
    for (const b of a.components) {
      if (b.component !== "Button" && b.component !== "IconButton") {
        if (b.component === "Switch") {
          b.props.value = false;
        } else if (b.component === "Radio") {
          if (firstRadioName !== b.props.name && b.props.name) {
            //   // firstRadioValue = b.props.value;
            firstRadioName = b.props.name;
            b.props.checked = true;
          } else {
            b.props.checked = false;
          }
        } else if (b.component === "Select") {
          b.props.value = b.props.options[0].value;
        } else {
          b.props.value = "";
        }
      }
    }
  }

  return newModel;
};

// ===== 스타일
const rowStyle = css`
  margin-bottom: 1.2rem;
  min-height: 45px;
`;
const rowStyleM = (direction: Tdirection) =>
  media.m(`
  ${
    direction === "vertical"
      ? `
      flex-wrap: wrap;
      & > div{ width: 100%;}
    `
      : `
      display: flex;
      align-items: center;
      & > div:last-of-type {
        flex: 1;
      }
    `
  }
`);
const rowStyleS = media.s(`
  flex-wrap: wrap;
  & > div {
    width: 100%
  }
`);
const labelStyle = css`
  font-size: 0.9rem;
`;
const labelStyleS = media.s(`width: 100%;`);
const labelStyleM = (width: string) => media.m(`width: ${width};`);
const formComponentStyle = css`
  width: auto;
  position: relative;
  // display: flex;
  & > div {
    margin: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding: 10px 0 8px;
  }
  .carrot-ui-input-root {
  }
  .carrot-ui-textfield-root {
    width: 100%;
  }
  .carrot-ui-select-root {
  }
  .custom-select-head {
    box-sizing: border-box;
    border: 1px solid ${getColor("grey-lighten-1")};
    border-bottom: 1px solid ${getColor("grey-lighten-1")} !important;
  }
`;
const styleFn = (style: TSTyle) =>
  css`
    ${style}
  `;

export default FormCreator;
