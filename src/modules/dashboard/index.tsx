import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";
import { Header } from "../../components/Header";

function Dashboard() {
  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        maxWidth={1480}
        w="100%"
        my="6"
        mx="auto"
        px="6"
      >
        <Flex mb={20} flexDirection="column">
          <Heading as='h4' size='md'>Cartão mais utilizado</Heading>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="purple.700" fontWeight="bold">
                BB Card
              </StatLabel>
            </Stat>
          </GridItem>
        </Flex>
        <Flex mb="2" flexDirection="column">
          <Heading as='h4' size='md'>Contas do mês</Heading>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="green.500" fontWeight="bold">
                Valores pagos
              </StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Março</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="red.700" fontWeight="bold">
                Valores a ser pago
              </StatLabel>
              <StatNumber>R$0.00</StatNumber>
              <StatHelpText>Março</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="purple.700" fontWeight="bold">
                Comparação com mês passado
              </StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Março
              </StatHelpText>
            </Stat>
          </GridItem>
        </Grid>
        
      </Flex>
    </>
  );
}

export { Dashboard };
