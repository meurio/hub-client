import React from 'react';
import { chakra } from 'bonde-components';
const { Box, Stack } = chakra;

const MenuActions: React.FC = ({ children }) => {
  return (
    <Box
      bgColor="rgb(247,247,247)"
      position="fixed"
      w="100%"
      pb={4}
      px={6}
      bottom={0}
      left={0}
    >
      <Stack
        direction="column"
        pt={4}
        borderTop="1px solid"
        borderTopColor="gray.200"
      >
        {children}
      </Stack>
    </Box>
  );
}

export default MenuActions;