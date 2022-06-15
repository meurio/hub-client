import React from "react";
import {
  Button,
  Text,
  Stack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "../icons";
import { Session } from "./types";

interface UserDropdownProperties {
  session: Session;
}

const UserDropdown: React.FC<UserDropdownProperties> = ({ session }) => {
  const { currentUser: user, logout } = session;
  const name = `${user.firstName} ${user.lastName}`;

  const title: any = (
    <Stack spacing={1}>
      <Heading as="h3" size="md">
        {name}
      </Heading>
      <Text fontSize="md" color="gray.200">
        {user.email}
      </Text>
    </Stack>
  );

  return (
    <Menu variant="link" colorScheme="pink">
      {({ isOpen }: any) => (
        <>
          <MenuButton
            aria-label="User Menu"
            as={Button}
            variant="dropdown"
            color="white"
            rightIcon={
              isOpen ? (
                <ArrowUpIcon boxSize={3} />
              ) : (
                <ArrowDownIcon boxSize={3} />
              )
            }
          >
            {name}
          </MenuButton>
          <MenuList zIndex="3">
            <MenuGroup title={title}>
              <MenuItem onClick={logout} icon={<CloseIcon boxSize={3} />}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default UserDropdown;
