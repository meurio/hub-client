import React from "react";
import { Box, Button, Stack, Grid, GridItem, Table, Tbody, Tr, Td, Text, Flex } from "bonde-components";
import { Link, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { Header } from "../../../../components/CardWithHeader";
import type { Widget } from "../../FetchWidgets";
import Chart from "./Chart";
import PlipsFormTable from './datatable/TableView';
import { usePerformanceQuery } from "./performance/fetchData";
import eleitorado from "./performance/eleitorado";

interface Properties {
  widget: Widget
}

interface Props {
  value: string | number;
  label: string;
  variant?: "lg" | "md"
}

const ValueWithLabel: React.FC<Props> = ({ value, label, variant = "md" }) => variant === "lg" ? (
  <Box>
    <Text
      color="black"
      fontWeight="extrabold"
      fontSize="4xl"
      lineHeight={1}
    >
      {value}
    </Text>
    <Text>{label}</Text>
  </Box>
) : (
  <Box>
    <Text
      color="black"
      fontWeight="bold"
      fontSize="2xl"
    >
      {value}
    </Text>
    <Text textTransform="uppercase" fontSize="sm">{label}</Text>
  </Box>
)

const percentage = (value = 0, total = 0) => Math.round(((value * 100) / total) * 100) / 100;

const Row: React.FC<any> = ({ data }) => (
  <Tr>
    <Td>{data.state}</Td>
    <Td>{data.confirmed_signatures || "0"}</Td>
    <Td>{`${percentage(data.confirmed_signatures, eleitorado.states[data.state] * eleitorado.goal.state)}%`}</Td>
  </Tr>
)

const PerformanceScene: React.FC<Properties> = ({ widget }) => {
  const { pathname } = useLocation();
  const { data, loading, error } = usePerformanceQuery(widget.id)

  if (loading) return <Text>Carregando dados de performance</Text>;
  if (error) return <Text color="red">{JSON.stringify(error)}</Text>;

  return (
    <Stack spacing={4}>
      <Grid templateColumns={['repeat(2, 1fr)', null, 'repeat(7, 1fr)']} gap={4}>
        <GridItem colSpan={1}>
          <Stack>
            <Header label="Total assinaturas" />
            <Flex bg="white" p={4} minH="131px" align="end">
              <ValueWithLabel
                variant="lg"
                value={data?.confirmed_signatures || "0"}
                label={`${percentage(data?.confirmed_signatures, eleitorado.total * eleitorado.goal.total)}% da meta`}
              />
            </Flex>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack>
            <Header label="Pendentes" />
            <Flex bg="white" p={4} minH="131px" align="end">
              <ValueWithLabel
                variant="lg"
                value={data?.pending_signatures || "0"}
                label={`${percentage(data?.pending_signatures, eleitorado.total * eleitorado.goal.total)}% da meta`}
              />
            </Flex>
          </Stack>
        </GridItem>
        <GridItem colSpan={2} rowSpan={2}>
          <Stack>
            <Header label="Total por estado" />
            <Box bg="white">
              <Table>
                <Tbody>
                {data?.states_signatures
                  .filter((ss) => !!ss.state)
                  .sort((a, b) => b.confirmed_signatures - a.confirmed_signatures)
                  .splice(0, isMobile ? 5 : 8)
                  // eslint-disable-next-line react/display-name
                  .map((ss) => <Row data={ss} />)}
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={3} rowSpan={2}>
            <Chart
              subscribers={data?.subscribers_range}
              start={data?.subscribers_range_start}
              end={data?.subscribers_range_end}
            />
          </GridItem>
        )}
        <GridItem colSpan={2}>
          <Stack flex={1} height="100%">
            <Header label="Ativistas" />
            <Stack bg="white" px={4} py={6} spacing={4} flex={1} height="100%" justifyContent="space-around">
              <ValueWithLabel
                variant="lg"
                value={data?.total_subscribers || "0"}
                label="Total de inscritos"
              />
              <Flex direction="row" justify="space-between">
                <ValueWithLabel value={`${percentage(data?.confirmed_subscribers, data?.total_subscribers)}%`} label="Concluídos" />
                <ValueWithLabel value={`${percentage((data?.total_subscribers || 0) - (data?.pending_subscribers || 0) - (data?.confirmed_subscribers || 0), data?.total_subscribers)}%`} label="Inscritos" />
                <ValueWithLabel value={`${percentage(data?.pending_subscribers, data?.total_subscribers)}%`} label="Pendentes" />
              </Flex>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
      {!isMobile && (
        <PlipsFormTable widgetId={widget.id} />
      )}
      {isMobile && (
        <Button minH="42px" as={Link} to={pathname + "/workflow"}>Atualizar ficha</Button>
      )}
    </Stack>
  )
}

export default PerformanceScene;