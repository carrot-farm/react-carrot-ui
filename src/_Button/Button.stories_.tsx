/** @jsx jsx */
import Button from './Button';
import { jsx, css } from '@emotion/core';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ButtonGroup from '../_ButtonGroup/ButtonGroup';
import Icon from '../Icon/Icon';

export default {
  title: 'components|Button',
  component: Button,
  decorators: [withKnobs],
};

export const button = ()  => {
  const label = text('children', 'Button');
  const size = select('size', ['small', 'medium', 'big'], 'medium');
  const theme = select(
    'theme',
    ['primary', 'secondary', 'tertiary'],
    'primary'
  );
  const disabled = boolean('disabled', false);
  const width = text('width', '');

  return (
    <Button 
      size={size}
      theme={theme}
      disabled={disabled}
      width={width}
      onClick={action('onClick')}
    >{label}</Button>
  )
};

button.story = {
  name: 'Default'
};

export const primaryButton = () => {
  return <Button>PRIMARY</Button>
};

export const secondaryButton = () => {
  return <Button theme="secondary">SECONDARY</Button>
};

export const tertiaryButton = () => {
  return <Button theme="tertiary">TERTIARY</Button>
};

// # 컴포넌트 컨테이너 스타일
const buttonWrapper = css`
.description {
  margin-bottom: 0.5rem;
}
& > div + div {
  margin-top: 2rem;
}
`;

// ===== size
export const sizes = () => {
  return(
    <div css={buttonWrapper}>
      <div>
        <div className="description">Small</div>
        <Button size="small">Button</Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button size="medium">Button</Button>
      </div>
      <div>
        <div className="description">Big</div>
        <Button size="big">Button</Button>
      </div>
    </div>
  )
}


// ===== disabled
export const disabled = () => {
  return(
    <div css={buttonWrapper}>
      <div>
        <Button disabled>Primary</Button>
      </div>
      <div>
        <Button disabled theme="secondary">Button</Button>
      </div>
      <div>
        <Button disabled theme="tertiary">Button</Button>
      </div>
    </div>
  )
};


// ===== Width
export const width = () => {
  return(
    <div css={buttonWrapper}>
      <div>
        <Button width="20rem">Custom Width</Button>
      </div>
      <div>
        <Button width="100%">Full Width</Button>
      </div>
    </div>
  )
};

// ===== 아이콘과 함께사용
export const withIcon = () => {
  return(
    <div>
      <ButtonGroup>
        <Button size="small">
          <Icon icon="heart" /> Like
        </Button>
        <Button >
          <Icon icon="heart" /> Like
        </Button>
        <Button size="big">
          <Icon icon="heart" /> Like
        </Button>
      </ButtonGroup>
    </div>
  )
};

// ===== 아이콘만 사용
export const iconOnly = () => {
  return(
    <div>
      <ButtonGroup>
        <Button iconOnly size="small">
          <Icon icon="heart" />
        </Button>
        <Button iconOnly >
          <Icon icon="heart" />
        </Button>
        <Button iconOnly size="big">
          <Icon icon="heart" />
        </Button>
      </ButtonGroup>
    </div>
  )
};