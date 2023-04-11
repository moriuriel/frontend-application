import { Divider, Flex } from "@chakra-ui/react";
import { Logo } from "../Logo";
import { NavLink } from "./NavLink";
import { Profile } from "./Profile";

export function Header() {
  return (
    <Flex maxWidth={1480} flexDirection="column" h="20" mx="auto" mt="4" px="6">
      <Flex as="header" w="100%"  align="center">
        <Logo />
        <Flex justifyContent="center">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/cartoes">Cartões</NavLink>
          <NavLink href="/categorias">Categorias</NavLink>
        </Flex>
        <Flex align="center" ml="auto">
          <Profile />
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
}
