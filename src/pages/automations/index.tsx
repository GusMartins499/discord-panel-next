import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Layout } from '../../components/Layout';

export default function Automations() {
  return (
    <Layout>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">Automações</Heading>

        <Link href="/" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="small"
            colorScheme="green"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar nova
          </Button>
        </Link>
      </Flex>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={['4', '4', '6']} color="gray.300" width="8">
              <Checkbox colorScheme="purple" />
            </Th>
            <Th>Status</Th>
            <Th>Data de cadastro</Th>
            <Th width="8">Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={['4', '4', '6']}>
              <Checkbox colorScheme="purple" />
            </Td>
            <Td>
              <Text fontWeight="bold">Launch time</Text>
            </Td>
            <Td>04 de Abril, 2022</Td>
            <Td>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="orange"
                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
              >
                Editar
              </Button>

            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Layout>
  );
}
