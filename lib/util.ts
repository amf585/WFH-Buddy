import axios from "axios";
import moment from "moment";
import { IStatusData } from "./db_query";

const BASE_URL = process.env.AUTH0_BASE_URL || 'http://localhost:3000'

/**
 * General utilities
 */

// Convert name to ID
export const nameToId = (name: string): string => {
    switch (name) {
        case 'andy':
            return '62a748c0b54942787cd765dc'
            break;
        default:
            return ''
    }
}

// Convert boolean value to display text
export const boolToDisplayText = (booleanVal: boolean): string => {
    return booleanVal ? 'Yes' : 'No'
}

// Convert timestamp string to display text
export const timestampToDisplayText = (timestamp: string): string => {
    const date = moment(+timestamp)
    return date.format('ddd (M/D) - h:mm a')
}

// Convert call availability value to display text
export const availabilityToDisplayText = (availability: string): string => {
    switch (availability) {
        case 'anytime':
            return 'Anytime'
        case 'none':
            return 'Emergency only'
        default:
            return 'Ask first'  
    }
}

// Generate classes for light banner
export const generateMoodBannerClasses = (light: string): string => {
    switch (light) {
        case 'siren':
        case 'red':
            return 'bg-danger text-white'
        case 'yellow':
            return 'bg-warning text-dark'
        case 'green':
            return 'bg-success text-white'
        default:
            return ''
    }
}

/**
 * Service calls to endpoints
 */

// Get status by full ID
export const getStatusById = async (id: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/status/getStatus/${id}`);
        return res.data
        
    } catch (e) {
        console.log(e)
        return false
    }
}

// Update status by full ID
export const updateStatusById = async (id: string | undefined, newStatus: IStatusData) => {

    if (!id) {
        return false
    }

    try {
        const res = await axios.post(
          `${BASE_URL}/api/status/updateStatus`,
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