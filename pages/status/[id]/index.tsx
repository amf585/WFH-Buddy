import React from 'react'
import { getSession, Session, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useEffect, useState } from 'react'
import io, { Socket } from 'Socket.IO-client'
import Link from 'next/link'
import { boolToDisplayText, timestampToDisplayText, getStatusById, nameToId, generateMoodBannerClasses, availabilityToDisplayText } from '../../../lib/util'
import { getStatusByIdDb, IStatus } from '../../../lib/db_query'
import { EditStatus } from '../../../components/edit-status'
import type { GetServerSidePropsContext, NextPage } from 'next'
import classnames from 'classnames'

let socket: Socket;

const Status: NextPage<IStatus> = ({edit = false, isConnected, data}) => { 
  
  const [statusData, setStatusData] = useState(data)
  const { error, isLoading } = useUser();
  const statusRowClasses: string = 'status-row my-3 p-3 d-flex justify-content-between rounded'

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

    socket.on('update-status', async () => {
      // Fetch latest status and update
      const newStatus: IStatus = await getStatusById(statusData?._id || '')
      setStatusData(newStatus.data)
    })
  }

  const testFunc = React.useCallback(async () => {
    socket.emit('status-change') 
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!isConnected) return <div>Failed to connect to Db</div>
  if (edit) return <EditStatus statusData={data} callback={testFunc} />
  
  return (
    <div className="status-details-container">
      <div className="status-details">
        <nav className="align-items-center bg-light d-flex justify-content-between navbar navbar-light p-3">
          <div className="last-update me-3">
            <strong className="me-2">Updated:</strong>
            {timestampToDisplayText(statusData.lastUpdate)}
          </div>
          <div className="logout small">
            <Link href="/api/auth/logout">Logout</Link>
          </div>
        </nav>
        
        <section className="status-content p-3">
          <div className={classnames('mood-container bg-gradient m-2 p-4 rounded-pill', generateMoodBannerClasses(statusData?.color))}>
            <div className="mood display-5 fw-bold text-center">
              {statusData?.mood?.toUpperCase()}
            </div>
          </div>

          <div className="p-3">
            <div className={classnames(statusRowClasses)}>
                <div>
                  <i className="bi bi-telephone"></i>Call
                </div>
                <div>
                  {availabilityToDisplayText(statusData.callAvailability)}
                </div>
            </div>

            <div className={classnames(statusRowClasses)}>
                <div>
                  <i className="bi bi-calendar-event"></i>In Meeting
                </div>
                <div>
                  {boolToDisplayText(statusData.meeting)}
                </div>
            </div>

            <div className={classnames(statusRowClasses)}>
                <div>
                  <i className="bi bi-headphones"></i>Headphones
                </div>
                <div>
                  {boolToDisplayText(statusData.music)}
                </div>
            </div>
          </div>

        </section>
      </div>
    </div> 
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
