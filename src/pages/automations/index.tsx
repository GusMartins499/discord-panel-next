import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';

import { Input } from '@components/Form/Input';
import { Layout } from '@components/Layout';
import { Modal } from '@components/Overlay';
import { Table } from '@components/pages/automations/Table';

import { useServie } from '@context/service';

type IAutomations = {
  id: string;
  status: string;
  schedule: string;
}

type CreateAutomationFormData = {
  status: string;
  schedule: string;
}

export default function Automations() {
  const service = useServie();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, resetField } = useForm<CreateAutomationFormData>();
  const [automations, setAutomations] = useState<IAutomations[]>([]);

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    await service.automation.list({
      onSuccess: (data) => setAutomations(data),
      onError: (error) => console.log('error', error),
    });
  };

  const handleCreateAutomation: SubmitHandler<CreateAutomationFormData> = async (values) => {
    const { schedule, status } = values;
    await service.automation.create({
      data: { schedule, status },
      onSuccess: () => {
        toast({
          title: 'Sucesso',
          description: 'Automação criada com sucesso!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
        resetField('status');
        resetField('schedule');
        onClose();
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Erro no cadastro da automação!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
        resetField('status');
        resetField('schedule');
        onClose();
      },
    });
  };

  return (
    <Layout>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">Automações</Heading>
        <Button
          size="sm"
          fontSize="small"
          colorScheme="purple"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={onOpen}
        >
          Criar nova
        </Button>
      </Flex>
      <Table automations={automations} handleListAutomations={fetchAutomations} />

      <Modal
        title="Nova automação"
        isOpen={isOpen}
        onClose={onClose}
        componentFooter={(
          <ModalFooter>
            <Box as="form" onSubmit={handleSubmit(handleCreateAutomation)}>
              <HStack>
                <Button colorScheme="purple" type="submit">
                  Salvar
                </Button>
                <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
              </HStack>
            </Box>
          </ModalFooter>
        )}
      >
        <Input label="status" {...register('status')} />
        <Input label="schedule" type="time" {...register('schedule')} />
      </Modal>
    </Layout>
  );
}
