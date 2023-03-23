import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Input, Link, Stack } from '@chakra-ui/react';

function SignUp() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="10"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="6">
          <Input
            name="name"
            type="name"
            placeholder="Nome Completo"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
          />
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
          />
          <Input
            name="password"
            type="password"
            placeholder="Sua Senha"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
          />
          <Input
            name="password"
            type="password"
            placeholder="Confirme sua senha"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="purple" size="lg">
          Cadastrar
        </Button>
        <Flex align="center" p={2} mt={5}>
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="14px"
            color="purple.700"
          >
            <ArrowBackIcon w={5} h={5} />
            Voltar para login
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { SignUp };
