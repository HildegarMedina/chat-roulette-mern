import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css'
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
