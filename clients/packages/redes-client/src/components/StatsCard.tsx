import React from "react";
import { Box, Stack } from "bonde-components";

const StatsCard = ({ children }: any) => (
  <Box display="flex" bg="white" boxShadow="sm" cursor="pointer" p={2} flex={1}>
    <Stack flex={1} direction="column" alignItems="center" justifyContent="center">
      {children}
    </Stack>
  </Box>
);

export default StatsCard;
