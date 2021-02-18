import { db as dbConnection } from '../db';

const urls = dbConnection.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

export default urls;
