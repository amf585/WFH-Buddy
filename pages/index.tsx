import {useUser} from '@auth0/nextjs-auth0';
import { Db } from 'mongodb';
import type {NextPage} from 'next'
import clientPromise from '../lib/mongodb'
import {ChangeEvent, useEffect, useState} from 'react'
import io, {Socket} from 'Socket.IO-client'

let socket: Socket;

interface IDbConnection {
  isConnected: boolean
  result?: any
}

const Home: NextPage<IDbConnection> = ({isConnected, result}) => {

  const [input, setInput] = useState('')
  const {user, error, isLoading} = useUser();

  useEffect(() => {
    // Scoped async function inside hook
    async function executeSocketInit() {
      await socketInitializer();
    }
    executeSocketInit();
  }, []);

  const socketInitializer = async (): Promise<void> => {
    await fetch('/api/websocket/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg: string) => {
      setInput(msg)
    })
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    <>
      <h1>Test</h1>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>

      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
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
