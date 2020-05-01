import React from 'react';
import ButtonGroup from './ButtonGroup';
import Button from '../Button/Button';
import { withKnobs, text, radios, boolean } from '@storybook/addon-knobs';

export default {
  title: 'components|ButtonGroup',
  component: ButtonGroup,
  decorators: [withKnobs]
};

// ===== 기본 컴포넌트
export const buttonGroup = () => {
  const direction= radios(
    'direction',
    { Row: 'row', Column: 'column' },
    'row'
  );
  const rightAlign = boolean('rightAlign', false);
  const gap = text('gap', '0.5rem');

  return (
    <ButtonGroup direction={direction} rightAlign={rightAlign} gap={gap}>
      <Button theme="tertiary">취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  )
};

buttonGroup.story = {
  name: 'Default'
}

// ===== 오른쪽 정렬
export const rightAlign = () => {
  return (
    <ButtonGroup rightAlign>
      <Button theme="tertiary">취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  )
}

// ===== 정렬방향
export const column = () => {
  return (
    <ButtonGroup direction="column">
      <Button>Click</Button>
      <Button>Click</Button>
    </ButtonGroup>
  )
}

// ===== 간격
export const customGap = () => {
  return (
    <ButtonGroup gap="1rem">
      <Button theme="tertiary">취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  )
}

// ===== 간격 / 정렬방향
export const customGapColumn = () => {
  return (
    <ButtonGroup direction="column" gap="1rem">
      <Button>취소</Button>
      <Button>확인</Button>
    </ButtonGroup>
  )
}