import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface ILayoutProps {
  children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
  return (
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
      {children}
    </Box>
  );
}
