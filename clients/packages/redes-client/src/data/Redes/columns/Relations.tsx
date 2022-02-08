/* eslint-disable react/display-name */
import React, { ReactElement } from "react";

import UPDATE_RELATIONSHIP_MUTATION from "../UpdateRelationship";
// import { MATCHES } from "../FetchMatches";
import { BtnWhatsapp } from "../../../pages/Relations/scenes";
import { UpdateStatus, CellName, CellDate } from "../../../components";
import {
  Groups,
  Columns,
  valueFirstName,
  valueString,
  valueAndRow,
  Individual,
  Agent,
  Relation
} from "../../../types";

const columns = (
  groups: Groups,
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  }
): Array<Columns> => {
  const recipientGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "volunteer",
      Header: "Voluntárias(os)",
      Cell: ({ value }: valueFirstName): ReactElement => CellName({ value }),
      bold: true,
    },
    {
      accessor: "recipient",
      Header: recipientGroup?.name || "-",
      Cell: ({ value }: valueFirstName): ReactElement => CellName({ value }),
      bold: true,
    },
    {
      accessor: "relationshipStatus",
      Header: "Status",
      width: 200,
      Cell: ({ value, row }: valueAndRow): ReactElement | string =>
        value && row ? (
          <UpdateStatus
            name="status"
            row={row}
            options={FilterOptions.relationshipStatus}
            selected={value}
            query={UPDATE_RELATIONSHIP_MUTATION}
            type="relationship"
            // refetchQuery={MATCHES}
          />
        ) : (
          "-"
        ),
      bold: true,
    },
    {
      accessor: "createdAt",
      Header: "Data de criação",
      Cell: ({ value }: valueString): string => CellDate({ value }),
    },
    {
      accessor: "updatedAt",
      Header: "Última atualização",
      Cell: ({ value }: valueString): string => CellDate({ value }),
    },
    {
      accessor: "agent",
      Header: "Feito por",
      Cell: ({ value }: valueFirstName): ReactElement => CellName({ value }),
    },
    {
      accessor: "id",
      Header: "Ação",
      className: "sticky",
      Cell: ({
        row,
      }: {
        row: { original: Relation<Individual, Agent> };
      }): ReactElement => (
        <BtnWhatsapp original={row.original} />
      ),
    },
  ];
};

export default columns;
