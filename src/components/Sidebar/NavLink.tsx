import {
  Icon, Link as ChakraLink, Text, LinkProps as chakraLinkProps,
} from '@chakra-ui/react';
import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';

interface INavLinkProps extends chakraLinkProps {
  icon: ElementType;
  children: String;
  href: string;
}

export function NavLink({
  icon, children, href, ...rest
}: INavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}
