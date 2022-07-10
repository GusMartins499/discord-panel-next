import { ReactNode } from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';

interface IContainerProps {
  maxWidth?: string;
  children: ReactNode;
}

export function Container({ maxWidth = '75rem', children }: IContainerProps) {
  return (
    <ChakraContainer maxWidth={maxWidth}>
      {children}
    </ChakraContainer>
  );
}
