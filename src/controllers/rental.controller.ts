import { Inject } from '@decorators/di'
import { Request, NextFunction } from 'express'
import { Controller, Get, Post } from '@decorators/express'

import { HttpCode } from '../constants/http-code.contant'
import { IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IRentalService } from '../services/interfaces/rental-service.interface'
import { RentalService } from '../services/rental.service'
import { CreateRentalValidation } from '../validators/rental/create-rental.validator'

@Controller('/rental')
export class RentalController {
  constructor (
    @Inject(RentalService)
    private readonly rentalService: IRentalService
  ) { }

  @Post('/', [CreateRentalValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    const rental: IRentalDTO = req.body
    const result = await this.rentalService.create(rental)

    return res.status(HttpCode.CREATED).json(result).end()
  }

  @Get('/')
  async findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, offset, ...query } = req.query
      const result = await this.rentalService.findAll(query, Number(limit), Number(offset))

      return res.status(200).json(result).end()
    } catch (err) {
      return next(err)
    }
  }
}
