import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  PlusSquareIcon
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../api/axios";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";

type CategoriesFormData = {
  name: string;
};

type CategoriesData = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

const cardFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
});
function Categories() {
  const toast = useToast();

  const [cards, setCards] = useState<CategoriesData[]>();

  const { register, handleSubmit, formState } = useForm<CategoriesFormData>({
    resolver: yupResolver(cardFormSchema),
    resetOptions: {
      keepIsSubmitted: true,
      keepErrors: true,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { errors } = formState;

  const getCategories = async () => {
    try {
      const response = await api.get<CategoriesData[]>("/categories");

      setCards(response.data);
    } catch (error) {
      toast({
        description:
          "Tivemos um erro inesperado, por favor tente novamente mais tarde",
        title: "Ops!",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddCard: SubmitHandler<CategoriesFormData> = async ({
    name,
  }: CategoriesFormData) => {
    try {
      api.post("/categories", { name });

      toast({
        title: "Parabéns!",
        description: "Categoria adicionanda com sucesso",
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        description:
          "Tivemos um erro inesperado, por favor tente novamente mais tarde",
        title: "Ops!",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-right",
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
            Nova Categoria
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            as="form"
            onSubmit={handleSubmit(handleAddCard)}
          >
            <ModalHeader>Nova Categoria</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                label="Categoria"
                {...register("name")}
                error={errors.name}
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
              <Card maxW="sm" key={card.id} bg="transparent" variant="outline">
                <CardBody>
                  <Stack spacing="3">
                    <Box>
                      <Heading size="md"  color="gray.900">
                        {card.name}
                      </Heading>
                      {card.isActive ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.800" />
                      )}
                    </Box>
                  </Stack>
                </CardBody>
                <Divider color="gray.100"/>
                <CardFooter>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="red"
                      aria-label="Search database"
                      isDisabled={!card.isActive}
                      icon={<DeleteIcon />}
                    />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export { Categories };
