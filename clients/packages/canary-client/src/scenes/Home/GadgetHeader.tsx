import React from "react";
import { Stack, Heading } from "bonde-components";

type Props = {
  title?: string
  actionRightElement?: React.ReactElement
}

const GadgetHeader: React.FC<Props> = ({ title, actionRightElement }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    h={12}
    alignItems="flex-end"
    py={4}
  >
    {title ? (
      <Heading
        as="h5"
        size="xs"
        color="gray.300"
        textTransform="uppercase"
      >
        {title}
      </Heading>
    ) : null}
    {actionRightElement}
  </Stack>
);

export default GadgetHeader;