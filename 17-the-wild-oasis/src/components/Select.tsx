import { FocusEvent } from "react";
import styled, { css } from "styled-components";

interface StyledSelect {
  $type?: string;
}

const StyledSelect = styled.select<StyledSelect>`
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  ${(props) =>
    props.$type === "brand" &&
    css`
      background-color: var(--color-brand-100);
    `}

  & option {
    background-color: inherit;
    color: inherit;
  }

  & option:hover,
  & option:checked {
    background-color: var(--color-brand-100) !important;
  }
`;

interface SelectProps {
  currentVal: string;
  options: { value: string; label: string }[];
  onChange: (e: FocusEvent<HTMLSelectElement, Element>) => void;
}

export default function Select({ currentVal, onChange, options, ...props }: SelectProps) {
  return (
    <StyledSelect value={currentVal} {...props} onChange={onChange}>
      {options.map((op) => {
        const { value, label } = op;
        return (
          <option key={value} value={value} disabled={value === currentVal}>
            {label}
          </option>
        );
      })}
    </StyledSelect>
  );
}
