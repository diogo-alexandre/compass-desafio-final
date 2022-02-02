import moment from 'moment'
import { Inject } from '@decorators/di'
import { Request, NextFunction } from 'express'
import { Controller, Post } from '@decorators/express'

import { HttpCode } from '../constants/http-code.contant'
import { DuplicatedEntry } from '../errors/duplicated-entry.error'
import { Conflict } from '../errors/http/conflict.error'
import { IPeopleDTO } from '../helpers/interfaces/people.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IPeopleService } from '../services/interfaces/people-service.interface'
import { PeopleService } from '../services/people.service'
import { PeopleCreateValidation } from '../validators/people/people-create.validator'

@Controller('/people')
export class PeopleController {
  constructor (
    @Inject(PeopleService)
    private readonly peopleService: IPeopleService
  ) { }

  @Post('/', [PeopleCreateValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { data_nascimento: birthday, habilitado, ...people }: IPeopleDTO = req.body

      await this.peopleService.create({
        ...people,
        data_nascimento: moment(birthday, 'DD/MM/YYYY').toDate(),
        habilitado: (habilitado === 'sim')
      })

      return res.status(HttpCode.CREATED).end()
    } catch (err) {
      let localError = err

      if (err instanceof DuplicatedEntry) {
        localError = new Conflict(err.message)
      }

      return next(localError)
    }
  }
}
