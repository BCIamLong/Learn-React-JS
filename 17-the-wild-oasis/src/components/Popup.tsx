import { ReactNode } from "react";
import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import Button from "./Button";

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
  width: 60%;
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

interface PopupProps {
  children: ReactNode;
  onShow: () => void;
}

export default function Popup({ children, onShow }: PopupProps) {
  return (
    <StyledPopup>
      <PopupBox>
        {children}
        <CloseBox>
          <Button $size="tiny" $variation="option" onClick={onShow}>
            <HiMiniXMark />
          </Button>
        </CloseBox>
      </PopupBox>
    </StyledPopup>
  );
}
