import styled, { css, RuleSet } from "styled-components";

interface Options {
  [props: string]: RuleSet;
}

const sizes: Options = {
  tiny: css`
    padding: 0.5rem 0.4rem;
  `,
  small: css`
    padding: 0.6rem 0.8rem;
  `,
  medium: css`
    padding: 1rem 1.4rem;
  `,
  large: css`
    padding: 1.2rem 1.6rem;
  `,
};

const variations: Options = {
  primary: css`
    font-size: 1.4rem;
    font-weight: 500;
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
    &:hover {
      background-color: var(--color-brand-100);
    }
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);
    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  option: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
  header: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    color: var(--color-brand-700);
    font-size: 1.4rem;
    font-weight: 500;
    gap: 0.3rem;
    padding: 0.4rem 0.6rem !important;
    svg {
      font-size: 2.4rem;
      font-weight: 500;
    }

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
  filter: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    &:hover {
      background-color: var(--color-brand-600);
      color: var(--color-grey-0);
    }
  `,
  pagination: css`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: var(--color-grey-50);
    color: var(--color-grey-700);
    &:hover {
      background-color: var(--color-brand-600);
      color: var(--color-grey-0);
    }
    & svg {
      font-size: 120%;
    }
  `,
  back: css`
    /* background-color: var(--color-grey-0); */
    background-color: inherit;
    color: var(--color-brand-700);
    font-weight: 500;
    &:hover {
      /* background-color: var(--color-brand-600); */
      color: var(--color-brand-800);
    }
  `,
  backV2: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    border: 1.5px solid var(--color-grey-200);
    border-radius: var(--border-radius-sm);
    /* font-weight: 500; */
    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  login: css`
    display: flex;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 500;
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    &:hover {
      background-color: var(--color-brand-700);
    }
    line-height: 1.4;
  `,
};

interface ButtonProps {
  $size?: keyof Options;
  $variation?: keyof Options;
  $active?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  /* Globals styles for button */
  border: none;
  border-radius: var(--border-radius-sm);
  text-transform: capitalize;
  /* ------------------------------------ */

  /* Style for many types of button can be change based on button type */
  ${(props) => sizes[props.$size!]}
  ${(props) => variations[props.$variation!]}
  /* ------------------------------------ */

  /* Default button */
  ${(props) => !props.$size && sizes["medium"]}
  ${(props) => !props.$variation && variations["primary"]}

  /* *active state */
  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-grey-0);
    `}
`;

// Button.defaultProps = {
//   $size: 'primary',
//   $variation: 'medium',
// };

export default Button;
