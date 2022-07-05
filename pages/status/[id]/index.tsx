import { getSession, Session, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import io, { Socket } from 'Socket.IO-client'
import Link from 'next/link';
import { nameToId } from '../../../lib/util';
import { getStatusById, IStatus } from '../../../lib/db_query';
import { EditStatus } from '../../../components/edit-status';

let socket: Socket;

const Status: NextPage<IStatus> = ({edit = false, isConnected, message, data}) => { 
  
  const [input, setInput] = useState('');
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
  if (!isConnected) return <div>Failed to connect to Db</div>
  if (message) return <div>{message}</div>
  if (edit) return <EditStatus />
  
  return (
    <>
      <h1>Test</h1>
      <Link href="/api/auth/logout">Logout</Link>

      <pre>
        {JSON.stringify(data)}
      </pre>
    </> 
  )
}

export default Status


export const getServerSideProps = withPageAuthRequired({

  async getServerSideProps(ctx: GetServerSidePropsContext) {

    const session: Session | null | undefined = getSession(ctx.req, ctx.res);
    const name: string = ctx.params?.id?.toString().toLowerCase() || ''
    const statusId: string = nameToId(name.toLowerCase())
    const statusData = await getStatusById(statusId)

    // Allow user to edit their own status
    if (session?.user?.email === statusData.data.email) {
      return {
        props:{edit: true, ...statusData}
      }
    }

    return {
      props: {...statusData}
    }
  }

})