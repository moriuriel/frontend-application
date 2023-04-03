import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Input } from '../../components/Form/Input'
import { Logo } from '../../components/Logo'
import { useAuth } from '../../hooks/auth'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
    resetOptions: {
      keepIsSubmitted: true,
      keepErrors: true,
    },
  })

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      await signIn({ email: values.email, password: values.password })

      navigate('/dashboard')
    } catch (error) {
      console.log(error)
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
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Link fontWeight="bold" fontSize="14px" color="purple.700" mt={2}>
          Esqueci Minha Senha
        </Link>

        <Button
          type="submit"
          mt="6"
          colorScheme="purple"
          size="lg"
          isLoading={formState.isLoading}
        >
          Entrar
        </Button>
        <Flex align="center" p={2} mt={5}>
          <Text marginRight="5px">Não tem uma conta?</Text>
          <Link
            as={RouterLink}
            to="/signup"
            fontWeight="bold"
            fontSize="14px"
            color="purple.700"
          >
            Registre-se
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { SignIn }
