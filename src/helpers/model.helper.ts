import { model, Schema } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';
import DuplicatedEntry from '../errors/duplicated-entry.error';
import InternalServerError from '../errors/http/internal-server.error';

import { IPaginateModel } from './interfaces/paginate.interface';

function Model <T>(name: string, schema: Schema): IPaginateModel<T> {
  schema.plugin(mongoosePagination);

  schema.post('save', (err: any, doc: T, next: Function): void => {
    if (err.name === 'MongoServerError') {
      if (err.code === 11000) {
        const key = Object.keys(err.keyPattern)[0];
        const value = err.keyValue[key];

        return next(new DuplicatedEntry(`Already exists ${name} with ${key} = "${value}" `));
      }

      return next(new InternalServerError('Unexpected error occurred'));
    }

    return next();
  });

  return model<T>(name, schema) as IPaginateModel<T>;
}

export default Model;
