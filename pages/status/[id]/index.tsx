import React from 'react';
import { getSession, Session, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { FormEvent, useEffect, useState } from 'react'
import io, { Socket } from 'Socket.IO-client'
import Link from 'next/link';
import { getStatusById, nameToId } from '../../../lib/util';
import { getStatusByIdDb, IStatus, IStatusData } from '../../../lib/db_query';
import { EditStatus } from '../../../components/edit-status';
import type { GetServerSidePropsContext, NextPage } from 'next'

let socket: Socket;

const Status: NextPage<IStatus> = ({edit = false, isConnected, message, data}) => { 
  
  const [input, setInput] = useState('test');
  const [statusData, setStatusData] = useState(data)
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

    socket.on('update-input', async () => {

      // TODO fetch latest status here and update
      const newStatus = await getStatusById(nameToId('andy'))

      setStatusData(newStatus)
    })
  }

  const testFunc = React.useCallback(async () => {
    socket.emit('input-change', 'new') 
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!isConnected) return <div>Failed to connect to Db</div>
  if (message) return <div>{message}</div>
  if (edit) return <EditStatus statusData={data} callback={testFunc} />
  
  return (
    <>
      <h1>Test</h1>
      <Link href="/api/auth/logout">Logout</Link>

      <pre>
        {JSON.stringify(statusData)}
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
    const statusData = await getStatusByIdDb(statusId)

    // Allow user to edit their own status
    if (session?.user?.email === statusData?.data?.email) {
      return {
        props:{edit: true, ...statusData}
      }
    }

    return {
      props: {...statusData}
    }
  }

})