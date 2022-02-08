import React from "react";
import { Button, Flex, Heading, Image, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { EmptyIcon } from "../icons";

export interface ListBoxItemRenderProps {
  item: any
}

export interface ListBoxProps<T = any> {
  data?: T[]
  emptyText?: string
  itemRender: React.FC<ListBoxItemRenderProps>
}

export const ListBox: React.FC<ListBoxProps> = ({
  data = [],
  itemRender,
  emptyText
}) => {
  return (
    <>
    {data.length > 0 ? (
        <List>
          {data.map((item: any, index) => (
            <ListItem key={`list-box-${index}`} p={4}>
              {itemRender({ item })}
            </ListItem>
          ))}
        </List>
      ) : (
        <Flex
          direction="column"
          height="100%"
          justify="center"
          align="center"
          flex={1}
        >
          <EmptyIcon boxSize={12} mb={4} />
          <Text>{emptyText}</Text>
        </Flex>
      )}
    </>
  );
}

export const ListBoxRenderCommunity: React.FC<any> = ({ item }) => (
  <Flex direction="row">
    <Image
      boxSize="40px"
      objectFit="cover"
      borderRadius="30px"
      alt={item.name}
      src={
        item.image ||
        `https://via.placeholder.com/100?text=${item.name.substring(
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
        variant="ghost"
        colorScheme="gray"
        onClick={() => {
          console.log("onClick community")
          // onChangeAsync({ community: item })
          //   .then(() => {
          //     push('/widgets');
          //   });
        }}
      >
        <Heading as="h5" fontWeight="extrabold" size="sm">{item.name}</Heading>
      </Button>
      {/* <CommunityMenu community={c} /> */}
    </Stack>
  </Flex>
);