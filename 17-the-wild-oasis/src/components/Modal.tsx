import {
  Dispatch,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  // useEffect,
  // useRef,
  useState,
} from "react";
import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import Button from "./Button";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledPopup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  /* background-color: var(--color-grey-400); */
  z-index: 100;
  /* filter: blur(0.1rem); */
  backdrop-filter: blur(3px);
`;

const PopupBox = styled.div`
  max-width: 60%;
  z-index: 300;
  position: relative;
  box-shadow: var(--shadow-lg);
`;

const CloseBox = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 2.4rem;
  /* color: var(--color-grey-300) !important; */

  & button {
    color: var(--color-grey-500);
  }
`;

interface ModalProps {
  children: ReactNode;
}

interface ModalContextType {
  close: () => void;
  openName: string;
  open: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

// ! use JSX.Element instead react node because now we are manipulating with Element
// *https://stackoverflow.com/questions/74904566/how-to-properly-type-children-in-react-context
function Open({ opens: openModalName, children }: { opens: string; children: JSX.Element }) {
  const { open } = useModalContext()!;

  return cloneElement(children, { onClick: () => open(openModalName) });
}

// function Window({ name, children }: { name: string; children: ReactNode }) {
function Window({ name, children }: { name: string; children: JSX.Element }) {
  const { openName, close, open } = useModalContext()!;
  // const modal = useRef(null);

  // useEffect(() => {
  //   if (!openName) return;
  //   const handleClick = (e: MouseEvent) => {
  //     if (modal.current === e.target) close();
  //   };

  //   document.addEventListener("click", handleClick);

  //   return () => document.removeEventListener("click", handleClick);
  // }, [openName]);
  const modal = useOutsideClick(close);

  if (openName !== name) return;

  return createPortal(
    <StyledPopup>
      <PopupBox ref={modal}>
        {cloneElement(children, { onCloseModal: open })}
        {/* {children} */}
        <CloseBox>
          <Button $size="tiny" $variation="option" onClick={close}>
            <HiMiniXMark />
          </Button>
        </CloseBox>
      </PopupBox>
    </StyledPopup>,
    document.body
  );
}

export function useModalContext() {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) throw new Error("The Modal context is using outside the provider");

  return modalContext;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");
  function close() {
    setOpenName("false");
  }
  return <ModalContext.Provider value={{ close, openName, open: setOpenName }}>{children}</ModalContext.Provider>;
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
