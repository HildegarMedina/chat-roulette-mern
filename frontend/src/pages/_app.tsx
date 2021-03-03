import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/globals.css'
import 'nprogress/nprogress.css';
import { UserContextsProvider } from '../contexts/UserContexts';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <UserContextsProvider>
      <Component {...pageProps} />
    </UserContextsProvider>
  )
}

export default MyApp
