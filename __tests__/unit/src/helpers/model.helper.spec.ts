import mongoose from 'mongoose';

import DuplicatedEntry from '../../../../src/errors/duplicated-entry.error';
import Model from '../../../../src/helpers/model.helper';

describe('Unit test model.helper', () => {
  beforeAll(() => {
    const modelSpy = jest.spyOn(mongoose, 'model');
    modelSpy.mockImplementation(() => {});
  });

  it('should throw duplicated entry if mongo server error code 11000', async () => {
    const schema: any = {
      plugin: () => { },
      post: (type: string, callback: Function) => callback({
        name: 'MongoServerError',
        code: 11000,
        keyPattern: { key: 1 },
        keyValue: { key: '...' },
      }, {}, (err: any) => {
        expect(err).toBeInstanceOf(DuplicatedEntry);
      }),
    };

    Model<any>('Test', schema);
  });

  it('should throw error if throw unexpected error', async () => {
    const schema: any = {
      plugin: () => { },
      post: (type: string, callback: Function) => callback(new Error(), {}, (err: any) => {
        expect(err).toBeInstanceOf(Error);
      }),
    };

    Model<any>('Test', schema);
  });
});
