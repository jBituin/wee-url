import { db as dbConnection } from '../db';

const url = dbConnection.get('urls');

url.createIndex({ slug: 1 }, { unique: true });

export default url;
