import { db as dbConnection } from '../db';
import { FilterQuery } from 'mongodb';

const url = dbConnection.get('urls');
url.createIndex({ slug: 1 }, { unique: true });
export default {
  ...url,

  findOne(args: FilterQuery<any> | undefined) {
    return url.findOne(args);
  },

  insert(args: any) {
    return url.insert(args);
  },
};
