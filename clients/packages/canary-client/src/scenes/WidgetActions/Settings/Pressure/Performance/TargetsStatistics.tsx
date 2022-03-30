import React from "react";
import {
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Tooltip
} from "bonde-components/chakra";
import { ActivityFeedEmail } from "./hooks/usePerformance";

const OpenedLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const openingCount = activityFeed.events.filter((evt) => evt.eventType === "open").length
  const isOpened = openingCount > 0;

  return (
    <Tooltip
      label={
        isOpened
          ? "O alvo recebeu os e-mails e abriu ao menos um deles."
          : "O alvo recebeu os e-mails, mas não abriu nenhum deles."
      }
      maxW="220px"
    >
      <Tag colorScheme={isOpened ? "green" : "yellow"}>
        {isOpened ? `Abriu ${openingCount}x` : "Não abriu"}
      </Tag>
    </Tooltip>
  )
}

const StatusLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const isDelivered = activityFeed.events.filter((evt) => evt.eventType === "delivered").length > 0;
  const isFailed = activityFeed.events.filter((evt) => evt.eventType === "bounce").length > 0;
  const isDropped = activityFeed.events.filter((evt) => evt.eventType === "dropped").length > 0;

  if (isDelivered) {
    return (
      <Tooltip
        label="Pelo menos um e-mail foi entregue com sucesso na caixa de entrada do alvo."
        maxW="220px"
      >
        <Tag colorScheme="green">Entregue</Tag>
      </Tooltip>
    )
  }

  if (isFailed) {
    return (
      <Tooltip
        label="O e-mail do alvo está incorreto ou a caixa de entrada dele está cheia. Confira o e-mail do alvo para conseguir pressioná-lo."
        maxW="220px"
      >
        <Tag colorScheme="red">Falhou</Tag>
      </Tooltip>
    )
  }

  if (isDropped) {
    return (
      <Tooltip
        label="O e-mail do alvo está correto, mas foi bloqueado porque ele se desinscreveu ou porque muitos emails foram marcados como spam."
        maxW="220px"
      >
        <Tag colorScheme="red">Bloqueou</Tag>
      </Tooltip>
    )
  } else {
    return null
  }
}

interface Props {
  aggregateEmails: ActivityFeedEmail[]
  activeTargets: string[]
}

interface ActivityFeedEmailWithDisabled extends ActivityFeedEmail {
  disabled: boolean
}

const TargetsStatistics: React.FC<Props> = ({ aggregateEmails, activeTargets }) => {
  const activeEmails = activeTargets.map((target) => (target.match(/^[A-zÀ-ú0-9 ()-.]+<([\w.@]+)>$/) || [])[1]);

  // Transforma todos e-mails ativos em eventos
  const items: ActivityFeedEmail[] = [...activeEmails.map((email: string) => {
    const activityFeed = aggregateEmails.filter((activityFeed) => activityFeed.email === email)[0]
    if (!activityFeed) {
      return {
        email,
        total: 0,
        events: []
      }
    }
    return activityFeed
  }), ...aggregateEmails]

  // Filtra e-mails diferentes
  const uniqueItems = items.reduce((acc, item) => {
    if (!acc.filter((itemAcc) => itemAcc.email === item.email)[0]) {
      acc.push(item);
    }
    return acc;
  }, [] as ActivityFeedEmail[])

  const withoutEvents = aggregateEmails.length !== 0;

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Todos os alvos ({uniqueItems.length})
      </Heading>
      <Table variant="simple" bg="white">
        {withoutEvents && (
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Enviados</Th>
              <Th>Entregues</Th>
              <Th>Status</Th>
              <Th>Abertura</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {uniqueItems
            .map((activityFeed: ActivityFeedEmail) => ({
              ...activityFeed,
              disabled: activeEmails.findIndex((email) => email === activityFeed.email) === -1
            }))
            .sort((a) => a.disabled ? 1 : -1)
            .map((activityFeed: ActivityFeedEmailWithDisabled, index: number) => {
              const processed = activityFeed
                .events
                .filter((evt) => evt.eventType === "processed" || evt.eventType === "dropped")
                .map((evt) => evt.total)
                .reduce((a, b) => a + b, 0)
                ;

              const delivered = activityFeed.events.filter(evt => evt.eventType === "delivered")[0];
              const deliveredPercentage = delivered?.total ? Math.round((delivered.total / processed) * 100) : 0;

              return (
                <Tr key={`activity-feed-${index}`} color={activityFeed.disabled ? "gray.300" : "inherit"}>
                  {activityFeed.disabled ? (
                    <Td>{activityFeed.email} (Inativo)</Td>
                  ) : (
                    <Td>{activityFeed.email}</Td>
                  )}
                  {withoutEvents && (
                    <>
                      <Td>{`${processed} envios`}</Td>
                      <Td>
                        {`${deliveredPercentage}% entregue`}
                      </Td>
                      <Td>
                        <StatusLabel activityFeed={activityFeed} />
                      </Td>
                      <Td>
                        <OpenedLabel activityFeed={activityFeed} />
                      </Td>
                    </>
                  )}
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </Stack>
  );
}

export default TargetsStatistics;
