import { useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  ModalFooter,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { RiPencilFill, RiDeleteBinFill } from 'react-icons/ri';
import { Modal } from '@components/Overlay';
import { useServie } from '@context/service';

type IAutomations = {
  id: string;
  status: string;
  schedule: string;
}

interface ITableProps {
  automations: IAutomations[]
  handleListAutomations: () => void
}

export function Table({ automations, handleListAutomations }: ITableProps) {
  const service = useServie();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [automationId, setAutomationId] = useState('');

  const handleDelete = async (id: string) => {
    setAutomationId(id);
    onOpen();
  };

  const handleConfirmationDelete = async () => {
    await service.automation.remove({
      id: automationId,
      onSuccess: () => {
        onClose();
        setAutomationId('');
        handleListAutomations();
      },
      onError: (error) => console.log('error', error),
    });
  };

  return (
    <ChakraTable colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th>Status</Th>
          <Th>Horário</Th>
          <Th>Ação</Th>
        </Tr>
      </Thead>
      <Tbody>
        {automations && automations.map((item) => (
          <Tr key={item.id}>
            <Td w="100%">
              <Text fontWeight="bold">{item.status}</Text>
            </Td>
            <Td w="100%">
              <Text fontWeight="bold">{item.schedule}</Text>
            </Td>
            <Td w="100%">
              <HStack>
                <IconButton
                  aria-label="Editar"
                  size="sm"
                  fontSize="small"
                  colorScheme="yellow"
                  icon={<Icon as={RiPencilFill} fontSize="16" color="white" />}
                />
                <IconButton
                  aria-label="Apagar"
                  size="sm"
                  fontSize="small"
                  colorScheme="red"
                  onClick={() => handleDelete(item.id)}
                  icon={<Icon as={RiDeleteBinFill} fontSize="16" />}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>

      <Modal
        title="Confirmação de exclusão"
        isOpen={isOpen}
        onClose={onClose}
        componentFooter={(
          <ModalFooter>
            <Box>
              <HStack>
                <Button colorScheme="purple" onClick={handleConfirmationDelete}>
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
              </HStack>
            </Box>
          </ModalFooter>
      )}
      >
        <Text>Tem certeza que deseja excluir ?</Text>
      </Modal>
    </ChakraTable>
  );
}
