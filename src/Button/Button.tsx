/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export type ButtonProps = {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭 했을 때 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 생김새를 설정 */
  theme?: 'primary' | 'secondary' | 'tertiary';
  /** 버큰의 크기를 설정 */
  size?: 'small' | 'medium' | 'big';
  /** 비활성화 */
  disabled?: boolean;
  /** 버튼의 너비를 임의로 설정 */
  width?: string | number;
  /** 버튼에서 아이콘만 보여줄 때 이 값을 `true`로 설정 */
  iconOnly?: boolean;
};

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다. */
function Button({
  children,
  onClick,
  theme = "primary",
  size = "medium",
  disabled,
  width,
  iconOnly,
}: ButtonProps) {
  // console.log('> ', style)
  return (
    <button
      css={[
        style,
        themes[theme],
        sizes[size],
        { width },
        iconOnly && [iconOnlyStyle, iconOnlySizes[size]],
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const style = css`
  cursor: pointer;
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus: {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    cursor: not-allowed;
  }
  svg {
    width: 1em;
    margin-right: 1em;
  }
`;

const themes = {
  primary: css`
    background: #20c997;
    color: white;
    svg {
      fill: white;
    }
    &:hover:enabled {
      background: #38d9a9;
    }
    &:active:enabled {
      background: #12b886;
    }
    &:disabled {
      background: #aed9cc;
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    svg {
      fill: #343a40;
    }
    &:hover:enabled {
      background: #f1f3f5;
    }
    &:active:enabled {
      background: #dee2e6;
    }
    &:disabled {
      background: #c6d3e1;
    }
  `,
  tertiary: css`
    background: none;
    color: #20c997;
    svg {
      fill: #20c997;
    }
    &:hover:enabled {
      background: #e6fcf5;
    }
    &:active:enabled {
      background: #c3fae8;
    }
    &:disabled {
      background: #bcd9d0;
    }
  `,
}

const sizes = {
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
    `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  big: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
};

const iconOnlyStyle = css`
  padding: 0;
  border-radius: 50%;
  svg {
    margin: 0;
  }
`;

const iconOnlySizes = {
  small: css`
    width: 1.75rem;
  `,
  medium: css`
    width: 2.5rem;
  `,
  big: css`
    width: 3rem;
  `,
};



export default Button;