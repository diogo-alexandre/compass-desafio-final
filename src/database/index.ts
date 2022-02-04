import mongoose from 'mongoose'

import { config } from './config'
import { Log } from '../helpers/log.helper'

export const Database = {
  async init (uri: string = config.uri): Promise<typeof mongoose> {
    Log.info(`Trying connection with mongo '${config.hidden(uri)}'`)

    const conn = await mongoose.connect(uri)

    Log.info('Connection with mongo established')

    return conn
  }
}
