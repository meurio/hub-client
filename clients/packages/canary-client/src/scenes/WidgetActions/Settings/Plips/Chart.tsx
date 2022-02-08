import React from 'react';
import { Flex, Stack, Heading, Text } from 'bonde-components';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Header } from '../../../../components/CardWithHeader';

const SubscribersChart: React.FC<any> = ({ subscribers }) => (
  <div style={{ width: "100%", height: "100%" }}>
    <ResponsiveContainer>
      <LineChart data={subscribers}>
        <Line type="monotone" dataKey="total" stroke="#50E3C2" />
        <CartesianGrid stroke="#EEEEEE" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

interface SubscribersChart {
  subscribers?: any[]
  start?: Date
  end?: Date
}

const SubscribersChartWrap: React.FC<SubscribersChart> = ({ subscribers, start, end }) => (
  <Stack flex={1} height="100%">
    <Header label="Progresso da campanha" />
    <Stack bg="white" boxShadow="sm" py={6} px={8} spacing={4} flex={1} height="100%">
      <Flex justify="space-between">
        <Stack spacing={1}>
          <Heading size="lg" fontWeight="extrabold">Inscrições</Heading>
          <Text fontSize="sm">{start?.toLocaleDateString()} a {end?.toLocaleDateString()}</Text>
        </Stack>
        <Text fontSize="sm" textTransform="uppercase">Últimos 30 dias</Text>
      </Flex>
      <SubscribersChart subscribers={subscribers} />
    </Stack>
  </Stack>
);

export default SubscribersChartWrap;
