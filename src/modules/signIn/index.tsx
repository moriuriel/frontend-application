import {Link as RouterLink} from'react-router-dom'
import { Button, Flex, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Logo } from '../../components/Logo';


function SignIn() {
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
        <Logo />
        <Stack spacing="6">
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
            placeholder="Senha"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
          />
        </Stack>
        <Link fontWeight="bold" fontSize="14px" color="purple.700" mt={2}>
          Esqueci Minha Senha
        </Link>

        <Button type="submit" mt="6" colorScheme="purple" size="lg">
          Entrar
        </Button>

        <Flex align="center" p={2} mt={5}>
          <Text marginRight="5px">Não tem uma conta?</Text>
          <Link as={RouterLink} to='/signup' fontWeight="bold" fontSize="14px" color="purple.700">
            Registre-se
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export {SignIn}
