import { Db, ObjectId } from "mongodb"
import clientPromise from "./mongodb"

/**
 * Database query utility functions 
 */

export interface IStatusData {
    edit?: boolean
    isConnected?: boolean
    message?: string
    result?: any
}

export const getStatusData = async (idStr: string) => {

    try {
        const client = await clientPromise
        const db: Db = client.db('wfh-buddy')
        const status = await db.collection('status').findOne({_id: new ObjectId(idStr)});

        return {
            isConnected: true, 
            result: JSON.parse(JSON.stringify(status))
        }

    } catch (e: any) {

        return {
            isConnected: false, 
            message: e.message
        }
    }
}