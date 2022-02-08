import React from "react";
import { Alert, ChartIcon, Text, Stack } from "bonde-components";

type Props = {
  firstEventTimestamp: Date
  widgetCreatedAt: Date
}

const DisclaimerRelease: React.FC<Props> = ({ firstEventTimestamp, widgetCreatedAt }) => {
  return firstEventTimestamp > widgetCreatedAt
    ? (
      <Alert status="success">
        <Stack direction="row" spacing={4} align="center">
          <ChartIcon />
          <Text color="black">{`Os dados de envio de e-mail começaram a ser coletados no dia ${firstEventTimestamp.toLocaleDateString()} para te dar mais visibilidade da performance das suas campanhas de pressão.`}</Text>
        </Stack>
      </Alert>
    )
    : null
    ;
}

export default DisclaimerRelease;
