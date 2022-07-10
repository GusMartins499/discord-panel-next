import { useState } from 'react';
import {
  Box, Heading, SimpleGrid, Text,
} from '@chakra-ui/react';

import { Layout } from '@components/Layout';

import { useFetch } from '@hooks/useFetch';

type IDiscordGuilds = {
  id: string;
  name: string;
}

export default function Dashboard() {
  const [discordGuilds, setDiscordGuilds] = useState<IDiscordGuilds[]>([]);

  useFetch({
    url: 'https://discord.com/api/users/@me/guilds',
    onSuccess: (response) => setDiscordGuilds(response),
    onError: () => console.error('error'),
  });

  return (
    <Layout>
      <Heading size="lg" fontWeight="normal">Seus servidores</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt="4">
        {discordGuilds?.map((guild) => (
          <Box w="100%" h="100%" bg="gray.700" key={guild.id} borderRadius="4">
            <Text fontSize="1.1rem" fontWeight="bold" p="1" textAlign="center">{guild.name}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Layout>
  );
}
