import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient } from '@database/mongo';

async function remove(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;

  await mongoClient.collection('automations').deleteOne({ id });

  return response.send(200);
}

export default remove;
