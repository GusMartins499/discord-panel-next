import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient } from '@database/mongo';

async function list(request: NextApiRequest, response: NextApiResponse) {
  const automations = await mongoClient.collection('automations').find({}).toArray();

  return response.json(automations);
}

export default list;
