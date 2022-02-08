import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Flex, Heading, Text, Stack } from "bonde-components";

export interface ChartsProps {
  pressures: any[]
}

const Charts: React.FC<ChartsProps> = ({ pressures }) => {
  return (
    <div style={{ width: "100%", height: "275px" }}>
      <ResponsiveContainer>
        <LineChart data={pressures}>
          <Line type="monotone" dataKey="total" stroke="#50E3C2" />
          <CartesianGrid stroke="#EEEEEE" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface ChartsWrapProps {
  pressures: any[]
  start: any
  end: any
}


const ChartsWrap: React.FC<ChartsWrapProps> = ({ pressures, start, end }) => {
  return (
    <Flex direction="column" flex={1}>
      <Stack direction="row" spacing={1} minH={6} alignItems="center">
        <Heading
          as="h5"
          size="xs"
          fontWeight="normal"
          color="gray.400"
          textTransform="uppercase"
        >
          Progresso da campanha
        </Heading>
      </Stack>
      <Stack bg="white" boxShadow="sm" py={6} px={8} spacing={4}>
        <Flex justify="space-between">
          <Stack spacing={1}>
            <Heading size="lg" fontWeight="extrabold">Pressões enviadas</Heading>
            <Text fontSize="sm">{start.toLocaleDateString()} a {end.toLocaleDateString()}</Text>
          </Stack>
          <Text fontSize="sm" textTransform="uppercase">Últimos 30 dias</Text>
        </Flex>
        <Charts pressures={pressures} />
      </Stack>
    </Flex>
  );
};

export default ChartsWrap;