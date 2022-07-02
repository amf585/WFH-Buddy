import { GetServerSidePropsContext } from "next"

/**
 * General utility functions
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