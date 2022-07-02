import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Content } from '../components/Layout/Container'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW='75rem'>
        <SessionProvider session={session}>
          <Header />
          <Content>
            <Sidebar />
            <Component {...pageProps} />
          </Content>
        </SessionProvider>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
