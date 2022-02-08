import React from "react";
import {
  Stack,
  Grid,
  GridItem,
  Text,
  ArrowDownIcon,
  ArrowUpIcon,
  BondeIcon,
  ChartIcon,
  CloseIcon,
  CloudIcon,
  CopyIcon,
  EyeIcon,
  InfoIcon,
  NetworkIcon,
  NewIcon,
  PencilIcon,
  RefreshIcon,
  RobotIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
  UploadImageIcon,
  UserIcon,
  WarnIcon,
  WhatsappIcon,
  WindowIcon
} from "@bonde/components";

const iconsComponentList: any[] = [
  ArrowDownIcon,
  ArrowUpIcon,
  BondeIcon,
  ChartIcon,
  CloseIcon,
  CloudIcon,
  CopyIcon,
  EyeIcon,
  InfoIcon,
  NetworkIcon,
  NewIcon,
  PencilIcon,
  RefreshIcon,
  RobotIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
  UploadImageIcon,
  UserIcon,
  WarnIcon,
  WhatsappIcon,
  WindowIcon
]

const IconsList = () => {
  return (
    <Grid templateColumns={["repeat(6, 1fr)"]} gap={4}>
      {iconsComponentList.map((IconComponent, index: number) => (
        <GridItem key={`icon-box-${index}`}>
          <Stack
            boxShadow="sm"
            align="center"
            spacing={2}
            p={6}
            flex={1}
          >
            <IconComponent />
            <Text>{IconComponent.displayName}</Text>
          </Stack>
        </GridItem>
      ))}
    </Grid>
  );
}

export default IconsList;