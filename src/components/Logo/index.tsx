import { Text } from '@chakra-ui/react'

export function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      color="purple.700"
      w="64"
    >
      minhas contas
      <Text as="span" ml="1" color="green.500">
        .
      </Text>
    </Text>
  )
}
