import { GetServerSideProps } from 'next';
import axios from 'axios';
import {
  Box, Heading, SimpleGrid, Text,
} from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import { Layout } from '../components/Layout';

type DiscordGuilds = {
  id: string;
  name: string;
}

interface IDiscordGuilds {
  discordGuilds: DiscordGuilds[];
}

export default function Dashboard({ discordGuilds }: IDiscordGuilds) {
  const { status } = useSession();
  return (
    <Layout>
      <Heading size="lg" fontWeight="normal">Seus servidores</Heading>
      {status === 'authenticated' && discordGuilds ? (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt="4">
          {discordGuilds.map((guild) => (
            <Box w="100%" h="100%" bg="gray.700" key={guild.id} borderRadius="4">
              <Text fontSize="1.1rem" fontWeight="bold" p="1" textAlign="center">{guild.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Heading size="lg" fontWeight="normal" mt="8">Ops .. Parece que você não está autenticado</Heading>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        discordGuilds: [],
      },
    };
  }
  const discordGuilds = await axios.get<IDiscordGuilds[]>('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return {
    props: {
      discordGuilds: discordGuilds?.data || null,
    },
  };
};
