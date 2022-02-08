import React from 'react';
import { Heading, Stack, Flex, DarkMode, Container as Content } from 'bonde-components';
import { isMobile } from 'react-device-detect';
import TabRoute from './TabRoute';

type Props = {
  title: string
  navigation: (args: NavigationArgs) => any
  children: any
}

export type NavigationArgs = {
  push: (path: string) => void
  is: (regex: any) => boolean
}

const Container: React.FC<Props> = ({ children, title, navigation }): React.ReactElement => {
  return (
    <TabRoute>
      {({ push, is }) => (
        <Flex direction="column" flex={1}>
          {!isMobile ? <Stack spacing={4} bg="black" px={[6, null, null, 12]}>
            <Heading as="h2" size="2xl" color="white" fontWeight="extrabold">{title}</Heading>
            <DarkMode>
              <Flex direction="row">
                {navigation({ push, is })}
              </Flex>
            </DarkMode>
          </Stack> : null}
          <Content display="flex" flex={1} flexDirection="column" height={["100%", null, null, "auto"]}>
            {children}
          </Content>
        </Flex>
      )}
    </TabRoute>
  );
}

export default Container;
