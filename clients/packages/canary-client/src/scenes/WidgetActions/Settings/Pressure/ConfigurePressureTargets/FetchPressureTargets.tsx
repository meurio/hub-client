import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import { Hint, Text } from "bonde-components";

const pressureTargetsByWidgets = gql`
  query FetchPressureWidgets($widgetId: Int!) {
    pressure_targets(where: { widget_id: { _eq: $widgetId } }) {
      email_body
      email_subject
      targets
      label
      identify
      id
    }
  }
`;

export type PressureTarget = {
  email_body: string;
  email_subject: string;
  targets: string;
  label: string;
  identify: string;
  id: number
};

type FetchPressureTargetsData = {
  pressure_targets: PressureTarget[];
};

type FetchPressureTargetsVars = {
  widgetId: number;
};

type Props = {
  widgetId: number;
  children: ({ pressure_targets }: FetchPressureTargetsData) => any;
};

const FetchPressureTargets = ({
  children,
  widgetId,
}: Props): React.ReactElement => {
  const { data, loading, error } = useQuery(pressureTargetsByWidgets, { variables: { widgetId } });

  if (error) return <Hint color="error">{JSON.stringify(error)}</Hint>;
  if (loading) return <Text>Carregando alvos...</Text>;

  return children({ pressure_targets: data?.pressure_targets || [] });
};

export default FetchPressureTargets;
