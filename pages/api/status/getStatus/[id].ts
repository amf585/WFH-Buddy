import { NextApiRequest, NextApiResponse } from "next";
import { getStatusByIdDb } from "../../../../lib/db_query";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query
        const status = await getStatusByIdDb(id.toString())
        res.status(200).json(status)
    
    } catch(error: any) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}
  