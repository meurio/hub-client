import React from "react";
import { Stack } from "bonde-components";
import Card from "./Card";

type Props = {
  targetsCount: number
  pressuresCount: number
}

const BondePressureCards: React.FC<Props> = ({ targetsCount, pressuresCount }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Card
        label="Pressões"
        helpText="Pressões são as inscrições feitas na sua campanha."
        value={pressuresCount}
      />
      <Card value={targetsCount} label="Alvos ativos" />
    </Stack>
  )
}

export default BondePressureCards;
