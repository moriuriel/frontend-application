import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Uriel Mori Vanso</Text>
          <Text color="gray.300" fontSize="small">
            moriuriel@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Uriel Mori Vanso"  background="gray.700" color="gray.100"/>
    </Flex>
  );
}