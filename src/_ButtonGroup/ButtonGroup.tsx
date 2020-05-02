/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export type ButtonGroupProps = {
  /** 버튼을 보여줄 방향 */
  direction: 'row' | 'column';
  /** 버튼을 우측에 보여준다. */
  rightAlign?: boolean;
  /** 버튼과 버튼 사이의 간격 */
  gap: number | string;
  /** 버튼 그룹에서 보여줄 버튼들 */
  children: React.ReactNode;
  /** 스타일 커스터 마이징시 사용 */
  className?: string;
};

/**
 * 여러개의 `Button` 컴포넌트를 보여주고 싶거나, 버튼을 우측에 정렬하고 싶을 때.
 */
const ButtonGroup = ({
  direction,
  rightAlign,
  children,
  gap = 'row',
  className = '0.5rem'
}: ButtonGroupProps) => {
  return (
    <div
      css={[
        {
          display: 'flex',
          flexDirection: direction,
        },
        gapStyle(direction, gap),
        rightAlign && rightAlignStyle
      ]}
      className={className}
    >
      {children}
    </div>
  )
};

ButtonGroup.defaultProps = {
  direction: 'row',
  gap: '0.5rem'
};

// ===== gap style 정의
const gapStyle = (direction: 'row' | 'column', gap: number | string) => {
  const marginType = direction === 'row' ? 'marginLeft' : 'marginTop';
  return css({
    'button + button': {
      [marginType]: gap
    }
  })
};

// ===== right align styles 정의
const rightAlignStyle = css`
  justify-content: flex-end;
`;

export default ButtonGroup;