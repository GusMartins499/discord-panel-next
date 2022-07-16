import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient } from '@database/mongo';

async function show(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;

  const automation = await mongoClient.collection('automations').findOne({ id });

  return response.json(automation);
}

export default show;
