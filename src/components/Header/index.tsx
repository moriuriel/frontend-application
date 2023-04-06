import { Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import { NavLink } from "./NavLink";
import { Profile } from "./Profile";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />
      <Flex justifyContent="center">
        <NavLink href="/cartoes">Cartões</NavLink>
        <NavLink href="/categorias">Categorias</NavLink>
      </Flex>
      <Flex align="center" ml="auto">
        <Profile />
      </Flex>
    </Flex>
  );
}
