import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";

interface IInputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: IInputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor='purple.500'
        bgColor='gray.900'
        variant='filled'
        _hover={{
          bgColor: 'gray.900',
        }}
        size='lg'
        {...rest}
      />
    </FormControl>
  )
} 