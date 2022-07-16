import { NextApiRequest, NextApiResponse } from 'next';
import { mongoClient } from '@database/mongo';

async function update(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;
  const { status, schedule } = request.body;
  const updatedItem = await mongoClient.collection('automations').updateOne(
    { id },
    { $set: { status, schedule } },
  );

  return response.json({ updatedItem });
}

export default update;
