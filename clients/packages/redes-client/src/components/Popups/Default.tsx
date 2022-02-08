import React from "react";
import {
  Text,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "bonde-components";

export default function Default({
  title,
  text,
  MainBtn,
  SecondaryBtn
}: {
  title: string;
  text: string;
  MainBtn: React.ReactNode;
  SecondaryBtn: React.ReactNode;
}): React.ReactElement {
  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Text>{text}</Text>
      </ModalBody>
      <ModalFooter justifyContent="space-between">
        {SecondaryBtn}
        {MainBtn}
      </ModalFooter>
    </ModalContent>
  );
}
