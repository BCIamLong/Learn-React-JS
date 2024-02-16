import { ReactNode, cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "~/hooks/useOutsideClick";

// interface OptionsBox {
//   $hide: boolean;
// }

const OptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90%;
  right: 1.5%;
  z-index: 100;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.6rem 2rem;
  background-color: var(--color-grey-0);
  border: none;

  &:first-child {
    border-top-right-radius: var(--border-radius-md);
    border-top-left-radius: var(--border-radius-md);
  }
  &:last-child {
    border-bottom-right-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:focus {
    border: none;
    /* outline: none; */
    outline: 1px solid var(--color-brand-900);
    background-color: var(--color-grey-100);
    /* border-collapse: collapse; */
  }
`;

const Menu = styled.div``;

interface MenuContext {
  // isSelected: boolean;
  // setIsSelected: Dispatch<SetStateAction<boolean>>;
  selectedId: number;
  // setSelectedId: Dispatch<SetStateAction<number>>;
  // setSelectedId: () => void;
  open: (id: number) => void;
  close: () => void;
}

const MenuContext = createContext<MenuContext | null>(null);

function Toggle({ id, children }: { id: number; children: JSX.Element }) {
  // const { setIsSelected, setSelectedId } = useMenuContext();
  // const { setSelectedId, selectedId } = useMenuContext();
  const { open, close, selectedId } = useMenuContext();

  return cloneElement(children, {
    onClick: () => {
      // setIsSelected((is) => !is);
      if (selectedId === id) return close();
      open(id);
    },
  });
}

function Button({ disabled, onClick, children }: { disabled?: boolean; onClick?: () => void; children: ReactNode }) {
  // const { setIsSelected, setSelectedId } = useMenuContext();
  // const { setSelectedId, selectedId } = useMenuContext();
  const { close } = useMenuContext();

  function handleClick() {
    onClick?.();
    if (!disabled) close();
  }

  return (
    <StyledButton disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
}

function Box({ id, children }: { id: number; children: ReactNode }) {
  // const { selectedId, isSelected } = useMenuContext();
  const { selectedId, close } = useMenuContext();
  const box = useOutsideClick(close);
  // if (!isSelected) return;

  // console.log(id !== selectedId);

  if (id !== selectedId) return;

  return <OptionsBox ref={box}>{children}</OptionsBox>;
}

function useMenuContext() {
  const context = useContext(MenuContext)!;

  if (context === undefined) throw new Error("This context is using outside its provider");

  return context;
}

function Menus({ children }: { children: ReactNode }) {
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  function close() {
    setSelectedId(0);
  }

  function open(id: number) {
    setSelectedId(id);
  }

  return (
    <MenuContext.Provider
      value={{
        // isSelected,
        // setIsSelected,
        // setSelectedId,
        selectedId,
        open,
        close,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

Menus.Box = Box;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
