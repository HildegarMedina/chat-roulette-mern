import Head from 'next/head'
import App from '../components/App';
import Container from '../components/Container';
import { UserContextsProvider } from '../contexts/UserContexts';

export default function Home() {

  return (
      <Container>
        <UserContextsProvider>
          <Head>
            <title>Chat Roulette App</title>
          </Head>

          <App/>

        </UserContextsProvider>

      </Container>
  )
  
}