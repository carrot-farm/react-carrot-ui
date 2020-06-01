/** @jsx jsx */
import React, { useRef } from 'react';
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  number,
  object,
  select,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import FormCreator from './FormCreator';

// ===== export 정보
export default {
  title: 'utils|FormCreator',
  component: FormCreator,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const props = {
    reset: boolean('reset', true),
    align: select('align', ['vertical', 'horizontal'], 'horizontal'),
    labelWidth: '150px',
    model: object('model', model),
    onChanges: {
      inputName: action('inputName')
    },
    onClicks: {
      iconButtonName: action('iconButtonName')
    },
    onSubmit: action('onSubmit'),
    formRef: useRef<HTMLFormElement>(null)
  };

  return (
    <FormCreator {...props}  />
  );
};

// ===== model
const model = [
  { 
    label: '이메일',
    style: 'background-color: blue',
    componentsStyle: 'background-color: red;',
    components: [{
      component: 'Input',
      style: 'backgrond-color: white;',
      props: {
        name: 'email',
        type: 'text',
        value: '',
      }
    }]
  }, {
    label: '패스워드',
    components: [{
      component: 'Input',
      props: { name: 'password', type: 'password', value: '', },
    }]
  }, {
    label: '텍스트 필드',
    components: [{
      component: 'TextField',
      props: { name: 'textfield', value: '',  rows: 2 }
    }]
  }, {
    label: '전화번호',
    componentsStyle: `display: flex; `,
    components: [
      {
        component: 'Input',
        props: { name: 'phone1', type: 'number', value: '' },
        style: { width: '5rem' }
      }, 
      {
        component: 'Input',
        props: { name: 'phone2', type: 'number', value: '' },
        style: { width: '5rem', marginLeft: '1.2rem' }
      }, 
      {
        component: 'Input',
        props: { name: 'phone3', type: 'number', value: '' },
        style: { width: '5rem', marginLeft: '1.2rem' }
      },
    ]
  }, 
  {
    label: '체크박스',
    components: [{
      component: 'CheckBox',
      props: { name: 'checkbox', checked: false, label: '체크박스' }
    }]
  },
  {
    label: '스위치',
    components: [{
      component: 'Switch',
      props: { name: 'switch', checked: false }
    }]
  }, {
    label: '라디오',
    componentsStyle: `display: flex; `,
    components: [
      { component: 'Radio', 
        props: { name: 'radio', label: '당근', value: '당근', checked: false } 
      },
      { component: 'Radio', 
        style: `margin-left: 4rem;`,
        props: { name: 'radio', label: '오이', value: '오이', checked: true } 
      },
      { component: 'Radio', 
        style: `margin-left: 4rem;`,
        props: { name: 'radio', label: '당근', value: '참외', checked: false } 
      },
    ]
  }, {
    label: '셀렉트',
    components: [
      { 
        component: 'Select', 
        props: { 
          name: 'radio', value: 'water',
          options: [
            { text: '당근', value: '당근' },
            { text: 'carrot', value: 'carrot', selected: true },
            { text: 'water', value: 'water' },
          ]
        } 
      },
    ]
  },{
    label: '아이콘 버튼',
    components: [{
      component: 'IconButton', 
      props: { 
        name: 'iconButtonName', iconName: 'home', circleButton: false
      }
    }]
  },{
    label: '버튼',
    style: `overflow: hidden;`,
    components: [{
      component: 'Button', 
      props: { 
        name: 'buttonName', type: 'submit', children: '버튼', fullWidth: true, size: 'l'
      }
    }]
  }
];