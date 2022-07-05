import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
