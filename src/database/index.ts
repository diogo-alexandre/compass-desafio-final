import mongoose from 'mongoose'

import { config } from './config'
import { Log } from '../helpers/log.helper'
import { RuntimeError } from '../errors/runtime.error'

export const Database = {
  async init (): Promise<typeof mongoose> {
    const uri = config.uri

    if (uri === undefined) {
      throw new RuntimeError('env "DB_URI" was not providaded.')
    }

    Log.info(`Trying connection with mongo '${config.hidden(uri)}'`)

    const conn = await mongoose.connect(uri)

    Log.info('Connection with mongo established')

    return conn
  }
}
