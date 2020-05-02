/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  select,
  text,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import Button from '../Button/Button';
import Container from '../Container/Container';

// ===== export 정보
export default {
  title: 'components|Container',
  component: Container,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const children = text('children', 'children');
  const fullWidth = boolean('fullWidth', false);

  return (
    <Container backgroundColor={"grey-lighten-1"} fullWidth={fullWidth}>
      {children}
    </Container>
  );
}