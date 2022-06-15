import React from "react";
import styled from "styled-components";
import theme from "../base/theme";
import CleanButton from "./CleanButton";

type ModalProps = {
  isOpen?: boolean;
};

const ModalStyled = styled.div<ModalProps>`
  display: ${(props) =>
    !props.isOpen ? "none" : "block"}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  z-index: 3;
`;

type ModalContent = {
  width: string;
  theme: any;
  height?: string;
};

const ModalContentStyled = styled.div<ModalContent>`
  background-color: ${(props) => props.theme.brand.light};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 30px;
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? `${props.height}` : "auto")};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButtonStyled = styled(CleanButton)`
  color: ${(props) => props.theme.commons.main};
  font-size: 28px;
  font-weight: bold;
  float: right;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.brand.dark};
    text-decoration: none;
    cursor: pointer;
  }
`;

type Props = {
  /** Flag used to control modal open and close */
  isOpen?: boolean;
  /** Width of modal content in percent (%) */
  width: string;
  height?: string;
  /** Function used when closing modal */
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ children, isOpen, onClose, width }: Props) => (
  <ModalStyled isOpen={isOpen}>
    <ModalContentStyled width={width} theme={theme}>
      <CloseButtonStyled theme={theme} onClick={onClose}>
        &times;
      </CloseButtonStyled>
      {children}
    </ModalContentStyled>
  </ModalStyled>
);

Modal.defaultProps = {
  isOpen: false,
  width: 300,
};

/** @component */
export default Modal;
