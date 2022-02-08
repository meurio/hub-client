import React from "react";
import { Stack, Heading, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "../icons";

export interface GadgetHeaderProps {
  title: string
  helpText?: string
  h?: string | number | any[]
  actionLeftElement?: React.ReactElement
  actionRightElement?: React.ReactElement
}

export const GadgetHeader: React.FC<GadgetHeaderProps> = ({
  title,
  helpText,
  h,
  actionLeftElement,
  actionRightElement
}) => {

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      h={h}
      minH={h}
      maxH={h}
      alignItems="flex-end"
    >
      {actionLeftElement}
      <Stack direction="row" spacing={3}>
        <Heading
          as="h5"
          size="sm"
          color="gray.400"
          textTransform="uppercase"
        >
          {title}
        </Heading>
        {helpText && (
          <Tooltip label={helpText} w={12}>
            <InfoIcon boxSize={4} />
          </Tooltip>
        )}
      </Stack>
      {actionRightElement}
    </Stack>
  );
}

export interface GadgetProps {
  h?: string | number | any[]
}

export const Gadget: React.FC<GadgetProps> = ({
  children,
  h = "auto"
}) => (
  <Stack flex={1} spacing={4} h={h} minH={h} maxH={h}>
    {children}
  </Stack>
);