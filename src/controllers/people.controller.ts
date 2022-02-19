import { Inject } from '@decorators/di';
import { Request, NextFunction } from 'express';
import { Controller, Post } from '@decorators/express';

import moment from 'moment';
import { IPeopleDTO } from '../helpers/interfaces/entities/people.interface';
import { Response } from '../helpers/interfaces/response.interface';
import { IPeopleService } from '../services/interfaces/people-service.interface';
import { PeopleCreateValidation } from '../validators/people/people-create.validator';
import PeopleService from '../services/people.service';
import HttpCode from '../constants/http-code.constant';

@Controller('/people')
class PeopleController {
  private readonly peopleService: IPeopleService;

  constructor(@Inject(PeopleService) peopleService: IPeopleService) {
    this.peopleService = peopleService;
  }

  @Post('/', [PeopleCreateValidation])
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { data_nascimento: birthDay, ...people }: IPeopleDTO = req.body;

      await this.peopleService.create({
        ...people,
        data_nascimento: moment(birthDay, 'DD/MM/YYYY').toDate(),
      });

      return res.status(HttpCode.CREATED).end();
    } catch (err) {
      return next(err);
    }
  }
}

export default PeopleController;
