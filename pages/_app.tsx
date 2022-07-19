import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import '/styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
