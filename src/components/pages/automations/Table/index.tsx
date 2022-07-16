import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  useToast,
} from '@chakra-ui/react';
import { RiPencilFill, RiDeleteBinFill } from 'react-icons/ri';
import { Modal } from '@components/Overlay';
import { Input } from '@components/Form/Input';
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

type EditAutomationFormData = {
  status: string;
  schedule: string;
}

export function Table({ automations, handleListAutomations }: ITableProps) {
  const service = useServie();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm<EditAutomationFormData>();
  const [automationId, setAutomationId] = useState('');

  const handleDeleteAutomation = async (id: string) => {
    setAutomationId(id);
    deleteModal.onOpen();
  };

  const handleConfirmationDeleteAutomation = async () => {
    await service.automation.remove({
      id: automationId,
      onSuccess: () => {
        deleteModal.onClose();
        setAutomationId('');
        handleListAutomations();
      },
      onError: (error) => console.log('error', error),
    });
  };

  const handleEditAutomation = async (id: string) => {
    setAutomationId(id);
    await service.automation.getAutomation({
      id,
      onSuccess: (data) => {
        setValue('status', data.status);
        setValue('schedule', data.schedule);
      },
      onError: () => toast({
        title: 'Error',
        description: 'Erro na automação!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      }),
    });
    editModal.onOpen();
  };

  const handleConfirmationEditAutomation = async (values: EditAutomationFormData) => {
    await service.automation.updateAutomation({
      id: automationId,
      data: values,
      onSuccess: () => {
        editModal.onClose();
        setAutomationId('');
        handleListAutomations();
      },
      onError: () => toast({
        title: 'Error',
        description: 'Erro ao editar automação!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      }),
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
                  onClick={() => handleEditAutomation(item.id)}
                  icon={<Icon as={RiPencilFill} fontSize="16" color="white" />}
                />
                <IconButton
                  aria-label="Apagar"
                  size="sm"
                  fontSize="small"
                  colorScheme="red"
                  onClick={() => handleDeleteAutomation(item.id)}
                  icon={<Icon as={RiDeleteBinFill} fontSize="16" />}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>

      <Modal
        title="Confirmação de exclusão"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        componentFooter={(
          <ModalFooter>
            <Box>
              <HStack>
                <Button colorScheme="purple" onClick={handleConfirmationDeleteAutomation}>
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={deleteModal.onClose}>Cancelar</Button>
              </HStack>
            </Box>
          </ModalFooter>
        )}
      >
        <Text>Tem certeza que deseja excluir ?</Text>
      </Modal>

      <Modal
        title="Editar Automação"
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        componentFooter={(
          <ModalFooter>
            <Box as="form" onSubmit={handleSubmit(handleConfirmationEditAutomation)}>
              <HStack>
                <Button colorScheme="purple" type="submit">
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={editModal.onClose}>Cancelar</Button>
              </HStack>
            </Box>
          </ModalFooter>
        )}
      >
        <Input label="status" {...register('status')} />
        <Input label="schedule" type="time" {...register('schedule')} />
      </Modal>
    </ChakraTable>
  );
}
