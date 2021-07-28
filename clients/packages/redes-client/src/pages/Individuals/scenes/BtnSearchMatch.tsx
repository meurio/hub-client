import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "bonde-components";
import { useSession } from "bonde-core-tools";

import {
  MAPA_DO_ACOLHIMENTO_COMMUNITY,
  zendeskOrganizations,
} from "../../../services/utils";
import { Individual } from "../../../types";

const BtnSearchMatch = ({
  original,
}: {
  original: Pick<
    Individual,
    "email" | "userStatus" | "availability" | "organizationId"
  >;
}): React.ReactElement => {
  const { community } = useSession();
  const isDisabled =
    community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
      ? original.organizationId === zendeskOrganizations["individual"]
        ? original.availability !== "inscrita"
        : original.availability !== "disponivel"
      : original.userStatus !== "aprovada" ||
        original.availability !== "disponível";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: "/match",
          state: { ...original },
        }}
      >
        <Button
          main="#ee0099"
          hover="#e2058a"
          focus="#b06c"
          secondary
          disabled={isDisabled}
        >
          Buscar match
        </Button>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: "/match/map",
          state: { ...original },
        }}
      >
        <Icon name="MapMarker" color={isDisabled ? "#AAAAAA" : "#ee0099"} />
      </Link>
    </div>
  );
};

export default BtnSearchMatch;
