import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { Container, Content } from '@components/Layout';

import { ServiceProvider } from '@context/service';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <SessionProvider session={session}>
          <ServiceProvider>
            <Header />
            <Content>
              <Sidebar />
              <Component {...pageProps} />
            </Content>
          </ServiceProvider>
        </SessionProvider>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
