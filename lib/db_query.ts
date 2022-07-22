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
    data: IStatusData
}

export interface IStatusData {
    _id?: string
    email?: string
    mood: string
    color: string
    music: boolean
    meeting: boolean
    callAvailability: string
    lastUpdate: string
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
export const getStatusByIdDb = async (statusId: string): Promise<IStatus | null> => {

    try {
        const db = await connectToDb();
        const status = await db.collection('status').findOne({_id: new ObjectId(statusId)});

        return {
            isConnected: true, 
            data: JSON.parse(JSON.stringify(status))
        }

    } catch (e: any) {
        return null
    }
}

// Update status by ID
export const updateStatusByIdDb = async (statusId: string, newStatus: IStatusData): Promise<Boolean> => {

    try {
        const db = await connectToDb();
        const status = await db.collection('status').findOneAndReplace({_id: new ObjectId(statusId)}, newStatus);

        return status ? true : false;

    } catch (e: any) {

        return false;
    }
}