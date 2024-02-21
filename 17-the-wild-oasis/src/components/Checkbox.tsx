import styled from "styled-components";

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  background-color: var(--color-grey-0);
  width: 100%;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  /* input[type="checkbox"]:checked::before {
    accent-color: var(--color-brand-600);
  } */

  input {
    width: 2.4rem;
    height: 2.4rem;
    /* background-color: var(--color-brand-600) !important; */
    accent-color: var(--color-brand-600);
  }
`;

export default function Checkbox({
  id,
  checked,
  label,
  onChange,
}: {
  id: number;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <StyledCheckBox>
      <input id={String(id)} checked={checked} type="checkbox" disabled={checked} onChange={onChange} />
      <label htmlFor={String(id)}>{label}</label>
    </StyledCheckBox>
  );
}
