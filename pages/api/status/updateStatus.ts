import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { updateStatusByIdDb } from '../../../lib/db_query';

export default withApiAuthRequired(async function update(req, res) {
  try {
    // Attempt to update status, return status of update (true/false)
    const updateSuccess = await updateStatusByIdDb(req.body.id, req.body.newStatus)
    res.status(200)
    res.json(updateSuccess)
    
  } catch(error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});