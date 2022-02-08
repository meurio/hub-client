import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import {
  Empty,
  // Chakra UI
  Button,
  Flex,
  Box,
  Heading,
  List,
  ListItem,
  Stack,
  Image,
  CommunityMenu
} from "bonde-components";
import {
  Context as SessionContext
} from "bonde-core-tools";
import { isMobile } from "react-device-detect";

type Props = {
  communities: any[];
};

const CommunitiesScrollBox = ({ communities }: Props): React.ReactElement => {
  const { push } = useHistory();
  const session: any = useContext(SessionContext);
  const isMobileWidth = window.innerWidth <= 768;
  const itemProps: any = {};
  if (isMobileWidth) {
    itemProps.className = "mobile";
  }

  return (
    <Box
      bg="white"
      overflowY="auto"
      overflowX="hidden"
      h="535px"
      css={{
        "::-webkit-scrollbar": {
          width: "33px"
        },
        "::-webkit-scrollbar-thumb": {
          backgroundClip: "padding-box",
          backgroundColor: "rgba(74, 74, 74, 0.75)",
          borderWidth: "20px 15px",
          borderStyle: "solid",
          borderColor: "transparent",
          borderImage: "initial"
        }
      }}
    >
      {communities.length > 0 ? (
        <List>
          {communities.map((c, index) => (
            <ListItem key={`communities-list-${index}`} display="flex" flexDirection="row" p={4}>
              <Image
                boxSize="40px"
                objectFit="cover"
                borderRadius="30px"
                alt={c.name}
                src={
                  c.image ||
                  `https://via.placeholder.com/100?text=${c.name.substring(
                    0,
                    1
                  )}`
                }
              />
              <Stack
                direction="row"
                flex={1}
                ml={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variant="link"
                  colorScheme="black"
                  textTransform="normal"
                  onClick={() => {
                    session
                      .updateSession('community', c)
                      .then(() => {
                        push('/widgets');
                      });
                  }}
                >
                  <Heading as="h5" fontWeight="extrabold" size="sm">{c.name}</Heading>
                </Button>
                {!isMobile ? <CommunityMenu session={session} community={c} /> : null}
              </Stack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Flex h="100%">
          <Empty message="Nenhuma comunidade encontrada" />
        </Flex>
      )}
    </Box>
  );
};

CommunitiesScrollBox.defaultProps = {
  communities: [],
};

export default CommunitiesScrollBox;
