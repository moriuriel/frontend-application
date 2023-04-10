import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  Progress,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
  Text,
  UnorderedList,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Header } from "../../components/Header";

type MostUsedCards = {
  tag: string;
  total: number;
  totalPercent: number;
};

type StatsBills = {
  amountPaid: string;
  amountToBePaid: string;
  amountPaidLastMonth: string;
  inCrescent: boolean;
};

type DashboardStats = {
  totalPaid: number;
  cards: MostUsedCards[];
  bills: StatsBills;
};

function Dashboard() {
  const toast = useToast();
  const [dashboardData, SetDashboardData] = useState<DashboardStats>();

  const getCards = async () => {
    try {
      const response = await api.get<DashboardStats>("/dashboard/stats");

      SetDashboardData(response.data);
    } catch (error) {
      toast({
        description:
          "Tivemos um erro inesperado, por favor tente novamente mais tarde",
        title: "Ops!",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  useEffect(() => {
    getCards();
  }, []);
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
        <Flex mb="6">
          <Button colorScheme="purple" rightIcon={<PlusSquareIcon />}>
            Adicionar Conta
          </Button>
        </Flex>
        <Flex mb="2" flexDirection="column">
          <Heading as="h4" size="md">
            Contas do mês
          </Heading>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="green.500" fontWeight="bold">
                Valores pagos
              </StatLabel>
              <StatNumber>{dashboardData?.bills.amountPaid}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="purple.700" fontWeight="bold">
                Valor pago mês passado
              </StatLabel>
              <StatNumber>
                {dashboardData?.bills.amountPaidLastMonth}
                <StatArrow
                  type={
                    dashboardData?.bills.inCrescent ? "increase" : "decrease"
                  }
                />
              </StatNumber>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="10">
            <Stat>
              <StatLabel color="red.700" fontWeight="bold">
                Valores a ser pago
              </StatLabel>
              <StatNumber>{dashboardData?.bills.amountToBePaid}</StatNumber>
            </Stat>
          </GridItem>
        </Grid>
        <Flex mt={100} flexDirection="column">
          <Heading as="h4" size="md">
            Cartões mais utilizados
          </Heading>
          <GridItem w="20%" h="10">
            <UnorderedList>
              {dashboardData?.cards.map((card) => {
                return (
                  <ListItem key={card.tag} mb={2}>
                    <Text color="purple.700" fontWeight="bold">
                      {card.tag} {card.total}/{dashboardData.totalPaid}
                    </Text>
                    <Progress
                      borderRadius={6}
                      colorScheme="purple"
                      value={card.totalPercent}
                    />
                  </ListItem>
                );
              })}
            </UnorderedList>
          </GridItem>
        </Flex>
      </Flex>
    </>
  );
}

export { Dashboard };
