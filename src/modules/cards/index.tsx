import {
  CheckIcon,
  CloseIcon,
  PlusSquareIcon,
  ViewIcon
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex, Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack, useDisclosure,
  useToast
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../api/axios";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";

type CardFormData = {
  tag: string;
};

type CardsData = {
  id: string;
  tag: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

const cardFormSchema = yup.object().shape({
  tag: yup.string().required("Apelido obrigatório")
});
function Cards() {
  const toast = useToast();

  const [cards, setCards] = useState<CardsData[]>();

  const { register, handleSubmit, formState } = useForm<CardFormData>({
    resolver: yupResolver(cardFormSchema),
    resetOptions: {
      keepIsSubmitted: true,
      keepErrors: true
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { errors } = formState;

  const getCards = async () => {
    try {
      const response = await api.get<CardsData[]>("cards/owner");

      setCards(response.data);
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

  const handleAddCard: SubmitHandler<CardFormData> = async ({
    tag
  }: CardFormData) => {
    try {
      api.post("/cards", { tag });

      toast({
        title: "Parabéns!",
        description: "Cartão adicionando com sucesso",
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top-right"
      });
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
    } finally {
      onClose();
    }
  };
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
        <Flex mb="6">
          <Button
            colorScheme="purple"
            onClick={onOpen}
            rightIcon={<PlusSquareIcon />}
          >
            Novo Cartão
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(handleAddCard)}>
            <ModalHeader>Novo Cartão</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                label="Apelido"
                {...register("tag")}
                error={errors.tag}
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" mt="6" colorScheme="purple" size="lg">
                Adicionar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {cards?.map((card) => {
            return (
              <Card maxW="sm" key={card.id} bg="gray.50">
                <CardBody>
                  <Stack spacing="3">
                    <Box>
                      <Heading size="md" color="gray.900">
                        {card.tag}
                      </Heading>
                      {card.isActive ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Box>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Flex align="center" justifyContent="space-between" w="100%">
                    <IconButton
                      colorScheme="purple"
                      aria-label="Search database"
                      isDisabled={!card.isActive}
                      icon={<ViewIcon />}
                    />
                    
                  </Flex>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export { Cards };
