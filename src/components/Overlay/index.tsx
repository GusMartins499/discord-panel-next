import { ReactNode } from 'react';
import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

interface IModalProps extends ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  componentFooter?: ReactNode;
}

export function Modal({
  title, isOpen, onClose, children, componentFooter = null, ...rest
}: IModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        {componentFooter || null}
      </ModalContent>
    </ChakraModal>
  );
}
