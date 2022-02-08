/* eslint-disable react/display-name */
import React, { ReactElement } from "react";

import { BtnWhatsapp } from "../../../pages/Relations/scenes";
import { CellDate, CellStatus } from "../../../components";
import {
  zendeskOrganizations,
  getAgentFromZendeskUserId,
} from "../../../services/utils";
import {
  Groups,
  Columns,
  valueFirstName,
  valueString
} from "../../../types";

const columns = (
  groups: Groups,
  // FilterOptions: {
  //   [x: string]: { label: string; value: string | number }[];
  // }
): Array<Columns> => {
  const recipientGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "volunteer",
      Header: "Voluntárias",
      Cell: ({ value }: valueFirstName): ReactElement | string => {
        return value ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value.id}/requested_tickets`}
          >
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "recipient",
      Header: recipientGroup?.name || "-",
      Cell: ({ value }: valueFirstName): ReactElement | string => {
        return value ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value.id}/requested_tickets`}
          >
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "relationshipStatus",
      Header: "Status",
      Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
    },
    {
      accessor: "recipient.state",
      Header: "Estado",
      Cell: ({ value }: { value: string }): ReactElement | string => (
        <span style={{ textTransform: "uppercase" }}>{value || "-"}</span>
      ),
    },
    {
      accessor: "volunteer.organizationId",
      Header: "Tipo",
      Cell: ({ value }: { value: number }): ReactElement | string => {
        return value === zendeskOrganizations.lawyer ? (
          <span>Jurídico</span>
        ) : value === zendeskOrganizations.therapist ? (
          <span>Psicológico</span>
        ) : (
          "-"
        );
      },
    },
    {
      accessor: "createdAt",
      Header: "Data de criação",
      Cell: ({ value }: valueString): string => CellDate({ value }),
    },
    {
      accessor: "agent",
      Header: "Feito por",
      Cell: ({ value }: valueFirstName): ReactElement => (
        <span>
          {value ? getAgentFromZendeskUserId[(value as unknown) as number] : ""}
        </span>
      ),
    },
    {
      accessor: "phone",
      Header: "Ação",
      className: "sticky",
      Cell: ({
        row: { original },
      }: {
        row: { original: any };
      }): ReactElement => {
        console.log({original})
        return (
          <BtnWhatsapp original={{
            ...original,
            volunteer: {
              ...original.volunteer,
              group: {
                isVolunteer: true,
                name: original.volunteer.organizationId === zendeskOrganizations["lawyer"] ? "Advogada" : "Psicóloga",
                settings: {}
              }
            },
            recipient: {
              ...original.volunteer,
              group: {
                isVolunteer: false,
                name: "MSR",
                settings: {}
              }
            }
          }} />
        )
      }
    },
  ];
};

export default columns;
