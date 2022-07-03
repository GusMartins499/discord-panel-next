import { Box, Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiGitMergeLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function Sidebar() {
  return (
    <Box as="aside" w="64" h="100%">
      <Stack spacing="12" align="flex-start">

        <NavSection title="GERAL">
          <NavLink href="/" icon={RiDashboardLine}>Dashboard</NavLink>
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
          <NavLink href="/automations" icon={RiGitMergeLine}>Automações</NavLink>
        </NavSection>

      </Stack>
    </Box>
  );
}
