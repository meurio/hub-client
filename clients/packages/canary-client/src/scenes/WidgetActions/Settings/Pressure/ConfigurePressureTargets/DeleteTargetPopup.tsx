import React from "react";
import { useMutation, gql } from "bonde-core-tools";
import {
  Text,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  toast
} from "bonde-components";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  remove: () => void;
  onClose: () => void;
  pressureTargetId: number;
};

const DELETE_PRESSURE_TARGET = gql`
  mutation DeletePressureTarget($id: Int_comparison_exp) {
    delete_pressure_targets(where: { id: $id }) {
      affected_rows
    }
  }
`;

const DeleteTargetPopup = ({
  open,
  remove,
  onClose,
  pressureTargetId
}: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");
  const [deleteTarget] = useMutation(DELETE_PRESSURE_TARGET);
  const onSubmit = async (pressureTargetId: number) => {
    try {
      await deleteTarget({ variables: { id: { _eq: pressureTargetId } } });
      
      remove();
      onClose();
      
      return toast(t("settings.pressure.delete.success"), {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      console.error(e);
      return toast(t("settings.pressure.delete.error"), {
        type: toast.TYPE.ERROR,
      });
    }
  };
  return (
    <Modal isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('settings.pressure.delete.title')}</ModalHeader>
        <ModalBody>
          <Text>{t('settings.pressure.delete.confirm')}</Text>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            type="button"
            variant="link"
            colorScheme="gray"
            onClick={onClose}
          >
            {t('settings.pressure.button.cancel')}
          </Button>
          <Button type="button" onClick={() => onSubmit(pressureTargetId)}>
            {t('settings.pressure.button.delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTargetPopup;
