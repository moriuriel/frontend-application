import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import { Header } from "../../../components/Header";

type BillsData = {
  id: string;
  title: string;
  tag: string;
  amount: 18;
  isPaid: boolean;
  cardId: string;
  ownerId: string;
  categoriesId: string;
  cardName: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

function ListBills() {
  const [bills, setBills] = useState<BillsData[]>();
  const toast = useToast();

  const getBills = async () => {
    try {
      const response = await api.get<BillsData[]>("/bills");

      setBills(response.data);
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
    getBills();
  }, []);

  return (
    <>
      <Header />
      <Flex
        flexDirection={"column"}
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        {bills?.map((bill) => {
          return (
            <Card variant={"outline"} bg={"transparent"} mb={15} key={bill.id}>
              <CardHeader>
                <Heading size="md" color="gray.700">
                  {bill.title}
                </Heading>
                <Heading size="xs" color={bill.isPaid ? "green.500" : "red.500"}>
                  {bill.isPaid ? "Conta Paga" :"Não Paga"}
                </Heading>
              </CardHeader>
              <CardBody>
                <Box>
                  <Heading mt={3} size="xs">
                    Cartão utilizada: {bill.cardName}
                  </Heading>
                  <Heading mt={3} size="xs">
                    Categoria: {bill.categoryName}
                  </Heading>
                  <Heading mt={3} size="xs">
                    Valor:  
                    {
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 2
                      }).format(bill.amount)
                    }
                  </Heading>
                </Box>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </>
  );
}

export { ListBills };
