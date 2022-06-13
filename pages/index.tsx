import {useUser} from '@auth0/nextjs-auth0';
import { Db } from 'mongodb';
import type {NextPage} from 'next'
import clientPromise from '../lib/mongodb'

interface IDbConnection {
  isConnected: boolean
  result?: any
}


const Home: NextPage<IDbConnection> = ({isConnected, result}) => {

  const {user, error, isLoading} = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  
  return (
    <>
      <h1>Test</h1>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </> 
  )
}

export default Home

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db: Db = client.db('wfh-buddy')
    const test = await db.collection('status').findOne({user: 'andrewfagan88@gmail.com'});
  
    return {
      props: {isConnected: true, result: JSON.parse(JSON.stringify(test))},
    }
  } catch (e) {
    console.error(e)
    return {
      props: {isConnected: false},
    }
  }
}
