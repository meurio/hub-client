import React from "react";
import { useMutation, gql } from "bonde-core-tools";
import { Header, Text, Button, toast } from "bonde-components";
import { useTranslation } from "react-i18next";
import { css } from "styled-components/macro";

type Props = {
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

const InsertTarget = ({
  remove,
  onClose,
  pressureTargetId
}: Props): React.ReactElement => {
  const { t } = useTranslation("widget");
  const [deleteTarget] = useMutation(DELETE_PRESSURE_TARGET);
  const onSubmit = async (pressureTargetId: number) => {
    try {
      const targetDeleted = await deleteTarget({
        variables: {
          id: { _eq: pressureTargetId },
        },
      });
      console.log({ targetDeleted });
      
      remove();
      
      onClose();
      
      return toast(t("pressure.target.delete.message.success"), {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      console.log(e);
      return toast(t("pressure.target.delete.message.error"), {
        type: toast.TYPE.ERROR,
      });
    }
  };
  return (
    <>
      <Header.H2>Excluir o grupo?</Header.H2>
      <Text style={{ margin: "20px 0" }}>
        O grupo de alvos será excluído e os contatos adicionados a ele serão
        perdidos.
      </Text>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          & > button:first-child {
            padding-left: 0;
            justify-content: start;
          }
        `}
      >
        <Button
          secondary
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button onClick={() => onSubmit(pressureTargetId)}>Excluir</Button>
      </div>
    </>
  );
};

export default InsertTarget;
