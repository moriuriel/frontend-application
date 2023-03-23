import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      minhas contas
      <Text as="span" ml="1" colorScheme="purple"color="purple.100">.</Text>
    </Text>
  );
}