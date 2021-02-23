import test, { ExecutionContext } from 'ava';
import sinon from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import monk, { ICollection, IMonkManager } from 'monk';

import UrlService from '../url/url.service';
import UrlModel from '../url/url.model';
import { ERRORS } from '../errors';
import urlService from '../url/url.service';

let dbConnection: IMonkManager;
let mongoServer: MongoMemoryServer;
let urlCollection: ICollection | null;

const mockData = {
  url: 'https://google.com',
  slug: 'gg',
};

async function connectoToMockDb(): Promise<void> {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  dbConnection = monk(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function getCollection(collectionName: string): ICollection {
  return dbConnection.get(collectionName);
}

test.before('start server', async () => {
  await connectoToMockDb();
  urlCollection = getCollection('urls');
  urlCollection.insert(mockData);
});

test.after.always('mock db cleanup', async () => {
  if (urlCollection) {
    await urlCollection.drop();
  }
  if (dbConnection) {
    await dbConnection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test('getUrl(): should return url', async (t: ExecutionContext) => {
  const mockResponse = {
    url: 'https://test.com',
  };
  UrlModel.findOne = sinon.stub().returns(mockResponse);
  const response = await urlService.getUrl('test');

  t.is(response, mockResponse.url);
});

test('getUrl(): should throw error', async (t: ExecutionContext) => {
  UrlModel.findOne = sinon.stub().returns(null);
  await t.throwsAsync(
    async () => {
      await UrlService.getUrl('test');
    },
    { instanceOf: Error, message: ERRORS.URL_NOT_FOUND }
  );
});
