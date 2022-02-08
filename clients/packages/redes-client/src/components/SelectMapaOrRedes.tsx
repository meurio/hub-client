import React, { useContext } from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { Context as SessionContext } from "bonde-core-tools";

import Data from "../data";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import { MAPA_DO_ACOLHIMENTO_COMMUNITY } from "../services/utils";
import { Groups } from "../types";

type Props = {
  component: ({
    data,
    community,
    groups,
  }: {
    data: any;
    community?: { id: number };
    groups: Groups;
  }) => React.ReactElement | null;
  path?: string;
  exact?: boolean;
};

const redirect = () => {
  alert("Você precisa selecionar alguma usuária para começar o Match");
  return <Redirect to="/pessoas" />;
};

const validateIfUserIsSelected = (component: any, state: any) => {
  return state ? component : redirect();
};

const SelectMapaOrRedes = ({
  component: ComponentToRender,
  ...rest
}: Props): React.ReactElement => {
  const { community }: any = useContext(SessionContext);
  const { groups } = useCommunityExtra();
  const { state } = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        const render = (
          <ComponentToRender
            {...props}
            groups={groups}
            community={community}
            data={
              community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
                ? Data.mapa
                : Data.redes
            }
          />
        );
        return rest.path === "/match"
          ? validateIfUserIsSelected(render, state)
          : render;
      }}
    />
  );
};

export default SelectMapaOrRedes;
