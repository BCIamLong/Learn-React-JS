import styled, { css } from 'styled-components';

interface RowProps {
  $type?: string;
}

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.2rem;
      align-items: start;
    `}
  ${(props) =>
    props.$type === 'horizontal' &&
    css`
      align-items: center;
      justify-content: space-between;
      gap: 2.4rem;
    `} /* ${(props) =>
    (props.$type === 'vertical' || !props.$type) &&
    css``} ! We can also use this to set default props */
`;

Row.defaultProps = {
  $type: 'vertical',
};

export default Row;
