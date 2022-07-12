import axios from "axios";
import { IStatusData } from "./db_query";

/**
 * General utilities
 */


export const nameToId = (name: string): string => {
    switch (name) {
        case 'andy':
            return '62a748c0b54942787cd765dc'
            break;
        default:
            return ''
    }
}

export const getStatusById = async (id: string) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/status/getStatus/${id}`);
        return res.data
        
    } catch (e) {
        console.log(e)
        return false
    }
}

export const updateStatusById = async (id: string | undefined, newStatus: IStatusData) => {

    if (!id) {
        return false
    }

    try {
        const res = await axios.post(
          "http://localhost:3000/api/status/updateStatus",
          {
            id,
            newStatus
          }
        );
        return res.data

    } catch (e) {
        console.log(e)
        return false
    }
}