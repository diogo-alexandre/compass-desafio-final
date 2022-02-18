import { Inject } from '@decorators/di'
import { Request, NextFunction } from 'express'
import { Controller, Post } from '@decorators/express'

import { HttpCode } from '../constants/http-code.contant'
import { IPeopleDTO } from '../helpers/interfaces/entities/people.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IPeopleService } from '../services/interfaces/people-service.interface'
import { PeopleService } from '../services/people.service'
import { PeopleCreateValidation } from '../validators/people/people-create.validator'
import moment from 'moment'

@Controller('/people')
export class PeopleController {
  constructor (
    @Inject(PeopleService)
    private readonly peopleService: IPeopleService
  ) { }

  @Post('/', [PeopleCreateValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { data_nascimento: birthDay, ...people }: IPeopleDTO = req.body

      await this.peopleService.create({
        ...people,
        data_nascimento: moment(birthDay, 'DD/MM/YYYY').toDate()
      })

      return res.status(HttpCode.CREATED).end()
    } catch (err) {
      return next(err)
    }
  }
}
