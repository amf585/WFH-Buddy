import {useUser} from '@auth0/nextjs-auth0';
import type {NextPage} from 'next'

const Home: NextPage = () => {

  const {user, error, isLoading} = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log('user: ', user);
  
  return (
    <>
      <h1>Test</h1>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </> 
  )
}

export default Home
