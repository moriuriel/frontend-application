import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Link, Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import * as yup from 'yup'
import { api } from '../../api/axios'
import { Input } from '../../components/Form/Input'
import { Logo } from '../../components/Logo'

type SignUpFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
  confirmPassword: yup.string().required('Senha obrigatória'),
})

function SignUp() {
  const toast = useToast()
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      await api.post('/users', {
        name: values.name,
        email: values.email,
        password: values.password,
      })

      toast({
        title: 'Sucesso!',
        description:
          'Falta pouco para você começar a usar a nossa plataforma, confirme o seu e-mail 😉',
        status: 'success',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      toast({
        description:
          'Tivemos um erro inesperado por favor tente novamente mais tarde',
        title: 'Ops!',
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Logo />
        <Stack spacing="6">
          <Input
            placeholder="Nome Completo"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
            error={errors.name}
            {...register('name')}
          />
          <Input
            type="email"
            placeholder="E-mail"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="Sua Senha"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
            error={errors.password}
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirme sua senha"
            variant="outline"
            borderColor="gray.700"
            focusBorderColor="gray.600"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="purple"
          size="lg"
          isLoading={formState.isSubmitting}
        >
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
  )
}

export { SignUp }
