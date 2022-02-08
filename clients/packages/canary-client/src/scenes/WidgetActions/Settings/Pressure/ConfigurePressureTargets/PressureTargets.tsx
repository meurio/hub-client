import React from "react";
import FetchPressureTargets, {
  PressureTarget as PressureTargetsType,
} from "./FetchPressureTargets";
import { Text, Icon, CleanButton } from "bonde-components";
import styled from 'styled-components';

type Props = {
  widgetId: number;
  setModal: (arg?: "insert" | "delete" | "update") => void;
  setPressureTarget: (arg: PressureTargetsType) => void;
};

const Grid = styled.div`
  display: grid;
  grid-row-gap: 15px;
`;

const TargetStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #eee;
`;

const PressureTargets = ({
  widgetId,
  setModal,
  setPressureTarget,
}: Props): React.ReactElement => {
  return (
    <Grid>
      <FetchPressureTargets widgetId={widgetId}>
        {({ pressure_targets }: { pressure_targets: PressureTargetsType[] }) =>
          pressure_targets.map((target) => (
            <TargetStyled key={target.id}>
              <Text>{target.label}</Text>
              <div>
                <CleanButton
                  onClick={() => {
                    setPressureTarget(target);
                    return setModal("update");
                  }}
                >
                  <Icon name="Pencil" />
                </CleanButton>
                <CleanButton
                  onClick={() => {
                    setPressureTarget(target);
                    return setModal("delete");
                  }}
                >
                  <Icon name="Trash" />
                </CleanButton>
              </div>
            </TargetStyled>
          ))
        }
      </FetchPressureTargets>
    </Grid>
  );
};

export default PressureTargets;
