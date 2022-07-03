import {
  Avatar, Box, Button, HStack, Text,
} from '@chakra-ui/react';
import { useSession, signOut, signIn } from 'next-auth/react';

interface IProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: IProfileProps) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <HStack spacing={2}>
          {showProfileData && (
            <Box textAlign="right">
              <Text>{session.user?.name}</Text>
              <Text color="gray.300" fontSize="small">
                {session.user?.email}

              </Text>
            </Box>
          )}
          <Avatar size="md" src={session.user?.image} />
          <Button onClick={() => signOut()} colorScheme="red">Sair</Button>
        </HStack>
      ) : (
        <Button onClick={() => signIn('discord')} colorScheme="purple">Entrar com Discord</Button>
      )}
    </>
  );
}
