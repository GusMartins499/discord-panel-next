import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Logo } from './Logo';
import { Profile } from './Profile';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="75rem"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />
      <Flex align="center" ml="auto">
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
