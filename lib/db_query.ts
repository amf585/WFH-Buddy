import { Db, ObjectId } from "mongodb"
import clientPromise from "./mongodb"

/**
 * Database query utilities 
 */


//// Interfaces

export interface IStatus {
    edit?: boolean
    isConnected?: boolean
    message?: string
    data?: any
}

export interface IStatusData {
    status: string
    color: string
    music: boolean
    meeting: boolean
    call: boolean
    lastUpdate: Date
}

//// Private Functions

// Make Database connection
const connectToDb = async (): Promise<Db> => {
    const client = await clientPromise;
    const db: Db = client.db('wfh-buddy');

    return db;
}

//// Public Functions

// Get Status by ID
export const getStatusById = async (statusId: string): Promise<IStatus> => {

    try {
        const db = await connectToDb();
        const status = await db.collection('status').findOne({_id: new ObjectId(statusId)});

        return {
            isConnected: true, 
            data: JSON.parse(JSON.stringify(status))
        }

    } catch (e: any) {

        return {
            isConnected: false, 
            message: e.message
        }
    }
}

// Update status by ID
export const updateStatusById = async (statusId: string, newStatus: IStatusData) => {

    try {

        const db = await connectToDb();

        // TODO - add update statement here and test
        // Will need to pass function from parent to child for socket emit when form submitted

        const status = await db.collection('status').findOneAndReplace({_id: new ObjectId(statusId)}, newStatus);

    } catch (e: any) {

        return {
            isConnected: false, 
            message: e.message
        }
    }
}