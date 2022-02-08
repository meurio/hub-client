/* eslint-disable react/display-name */
import React, { ReactElement } from "react";
import { Button } from "bonde-components";
import { CellStatus, CellDate } from "../../../components";
import { Columns, valueString, Individual, valueAndRow } from "../../../types";

const columns = (
  dispatch: (value: {
    type: string;
    value: { [x: string]: Individual };
  }) => void,
  setModal: (value: boolean) => void,
  isVolunteerSelected?: boolean
): Array<Columns> => {
  return [
    {
      accessor: "id",
      Header: "Nome",
      Cell: ({
        row: { original },
        value,
      }: {
        row: { original: Individual };
        value: number;
      }): ReactElement | string => {
        return original.firstName ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value}/requested_tickets`}
          >
            <span>{original.firstName}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "email",
      Header: "E-mail",
      Cell: ({ value }: valueString): ReactElement => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "occupationArea",
      Header: "Área de ocupação",
      Cell: ({ value }: valueString): ReactElement => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "distance",
      Header: "Distância",
      Cell: ({ value }: valueString): ReactElement => (
        <span>{Number(value).toFixed(2) || "-"}</span>
      ),
      width: 50,
    },
    {
      accessor: "address",
      Header: "Endereço",
      Cell: ({ value }: valueString): ReactElement => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "relationshipStatus",
      className: isVolunteerSelected ? "hide" : "",
      Header: "Status Relação",
      Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
    },
    {
      accessor: "availability",
      Header: "Disponibilidade",
      className: isVolunteerSelected === false ? "hide" : "", // hide if is a recipient
      Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
    },
    {
      accessor: "createdAt",
      Header: "Data Inscrição",
      className: isVolunteerSelected ? "hide" : "", // hide if is a volunteer
      Cell: ({ value }: valueString): string => CellDate({ value }),
    },
    {
      accessor: "ultimosEncaminhamentosRealizados",
      Header: "ER 30D.",
      className: isVolunteerSelected === false ? "hide" : "",
      Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
      width: 50,
    },
    {
      accessor: "encaminhamentosRealizados",
      Header: "ER",
      className: isVolunteerSelected === false ? "hide" : "",
      Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
      width: 50,
    },
    {
      accessor: "atendimentosEmAndamento",
      Header: "AT INI",
      className: isVolunteerSelected === false ? "hide" : "",
      Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
      width: 50,
    },
    {
      accessor: "atendimentosConcluidos",
      Header: "AT CON",
      className: isVolunteerSelected === false ? "hide" : "",
      Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
      width: 50,
    },
    {
      accessor: "phone",
      Header: "Ação",
      className: "sticky",
      Cell: ({ row: { original } }: valueAndRow): ReactElement | null => {
        return (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                setModal(true);
                dispatch({
                  type: "match",
                  value: {
                    [isVolunteerSelected ? "volunteer" : "recipient"]: original,
                  },
                });
              }}
              main="#ee0099"
              hover="#e2058a"
              focus="#b06c"
              secondary
            >
              Selecionar
            </Button>
          </div>
        );
      },
    },
  ];
};

export default columns;
