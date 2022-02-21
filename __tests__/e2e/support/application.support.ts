import mongoose from 'mongoose';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import App from '../../../src/App';
import PeopleSeeder from '../seeders/people.seeder';
import CarSeeder from '../seeders/car.seeder';
import RentalSeeder from '../seeders/rental.seeder';

import { IEntities } from './interfaces/entities.interface';

export interface IApplicationResponse {
  app: Express
  entities: IEntities
  end: () => Promise<void>
}

export const Application = {
  start: async (): Promise<IApplicationResponse> => {
    const mongo = await MongoMemoryServer.create();
    const app = await App.init({ db_uri: mongo.getUri(), log: false });

    return {
      app,
      entities: {
        people: await PeopleSeeder.handle(),
        car: await CarSeeder.handle(),
        rental: await RentalSeeder.handle(),
      },
      end: async () => {
        await mongoose.connection.close();
        await mongo.stop();
      },
    };
  },
};
/*
export async function Application (): Promise<IApplicationResponse> {
  let mongo
  let app

  return {
    start: async () => {

    },
    end: async () => {
      console.log('end')
    }
  }
}
*/
