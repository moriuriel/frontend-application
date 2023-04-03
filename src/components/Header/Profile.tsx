import { Avatar, Box, Flex, Link, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

export function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{user.name}</Text>
        <Text color="gray.300" fontSize="small">
          {user.email}
        </Text>
        <Link
          as="button"
          fontWeight="bold"
          fontSize="14px"
          color="purple.700"
          onClick={handleSignOut}
        >
          Sair
        </Link>
      </Box>
      <Avatar
        size="md"
        name={user.name}
        background="gray.700"
        color="gray.100"
      />
    </Flex>
  )
}
