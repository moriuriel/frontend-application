import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text
} from "@chakra-ui/react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  href: string;
}

export function NavLink({ children, href, ...rest }: NavLinkProps) {
  return (
    <ChakraLink
      as={ReactRouterNavLink}
      to={href}
      display="flex"
      align="center"
      {...rest}
    >
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
  );
}
