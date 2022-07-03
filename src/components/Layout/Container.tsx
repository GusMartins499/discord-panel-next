import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface IContentProps {
  children: ReactNode
}

export function Content({ children }: IContentProps) {
  return (
    <Flex w="100%" my="6" maxWidth="75rem" mx="auto" px="6">
      {children}
    </Flex>
  );
}
