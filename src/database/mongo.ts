import { MongoClient } from 'mongodb';
import { enviroment } from '@utils/enviroment';

const url = enviroment.MONGODB_URL;
const dbName = enviroment.MONGODB_DATABASE;

const mongoClient = new MongoClient(url).db(dbName);

export { mongoClient };
