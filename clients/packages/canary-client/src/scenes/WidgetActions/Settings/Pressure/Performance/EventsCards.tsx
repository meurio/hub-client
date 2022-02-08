import React from "react";
// import Card from "./Card";
import { Flex, InfoIcon, Text, Tooltip, Stack } from "bonde-components";
import { ActivityFeedEvent } from "./hooks/usePerformance";
import { CardHeader } from "./Card";

type Props = {
  aggregateEvents: ActivityFeedEvent[]
}

const PercentageLabel: React.FC<any> = ({ label, value, helpText }) => (
  <Stack spacing={0}>
    <Text fontWeight="extrabold" color="black" fontSize="2xl">{`${value}%`}</Text>
    <Stack direction="row" spacing={2} align="center">
      <Text>{label}</Text>
      {helpText && (
        <Tooltip label={helpText} maxW="220px" backgroundColor="gray.400">
          <InfoIcon boxSize={4} color="gray.400" />
        </Tooltip>
      )}
    </Stack>
  </Stack>
);

const EventsCards: React.FC<Props> = ({ aggregateEvents }) => {
  const processed: number = aggregateEvents
    .filter((evt: ActivityFeedEvent) => evt.eventType === "processed" || evt.eventType === "dropped")
    .map((evt: ActivityFeedEvent) => evt.total)
    .reduce((a: number, b: number) => a + b, 0);

  // Filter events
  const dropped: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "dropped")[0];
  const bounce: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "bounce")[0];
  const delivered: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "delivered")[0];

  // Parse events to percentage
  const droppedPercetage: number = Math.round(dropped?.total ? (dropped?.total / processed) * 100 : 0);
  const bouncePercentage: number = Math.round(bounce?.total ? (bounce?.total / processed) * 100 : 0);
  const deliveredPercentage: number = Math.round(delivered?.total ? (delivered?.total / processed) * 100 : 0);

  return (
    <Flex direction="column" flex={1}>
      <CardHeader
        label="Emails enviados"
        helpText="O total de emails enviados varia de acordo com o número de pressões realizadas, a quantidade de alvos e se o envio otimizado está ativado ou não."
      />
      <Flex
        direction="column"
        bg="white"
        borderRadius="4px"
        boxShadow="sm"
        flex={1}
        p={6}
        justify="space-between"
      >
        <Text color="black" fontWeight="extrabold" fontSize="4xl">{processed}</Text>
        <Stack direction="row" spacing={6}>
          <PercentageLabel
            label="Entregues"
            helpText="O total de emails que chegaram com sucesso na caixa dos alvos."
            value={deliveredPercentage}
          />
          <PercentageLabel
            label="Bloqueados"
            helpText="Pode ocorrer porque o alvo se desinscreveu, porque muitos e-mails foram marcados como spam ou porque o servidor do alvo bloqueou."
            value={droppedPercetage}
          />
          <PercentageLabel
            label="Falhas"
            helpText="O famoso bounce! Ocorre porque o e-mail do alvo está incorreto ou porque a caixa de entrada dele está cheia."
            value={bouncePercentage}
          />
        </Stack>
      </Flex>
    </Flex>
  );
}

export default EventsCards;
