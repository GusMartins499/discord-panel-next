import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { mongoClient } from '@database/mongo';

async function create(request: NextApiRequest, response: NextApiResponse) {
  const { status, schedule } = request.body;
  const insertedItem = await mongoClient.collection('automations').insertOne({
    id: uuid(),
    status,
    schedule,
  });

  return response.json({ insertedItem });
}

export default create;
