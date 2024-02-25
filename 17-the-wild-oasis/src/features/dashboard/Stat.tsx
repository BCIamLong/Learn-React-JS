import styled from "styled-components";

const StyledStat = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  gap: 1.6rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 0.6rem;
  p:first-child {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    font-weight: 600;
    text-transform: uppercase;
  }
  p:last-child {
    font-size: 2.4rem;
    line-height: 1;
    font-weight: 500;
  }
`;

interface Icon {
  $color: string;
}

const Icon = styled.div<Icon>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.4rem;
  height: 6.4rem;
  background-color: var(--color-${(props) => props.$color}-100);
  color: var(--color-${(props) => props.$color}-700);
  border-radius: 100%;
  padding: 1.2rem;

  svg {
    line-height: 1;
    font-size: 3rem;
  }
`;

export default function Stat({
  title,
  color,
  icon,
  value,
}: {
  title: string;
  color: string;
  icon: JSX.Element;
  value: string;
}) {
  return (
    <StyledStat>
      <Icon $color={color}>{icon}</Icon>
      <Content>
        <p>{title}</p>
        <p>{value}</p>
      </Content>
    </StyledStat>
  );
}
