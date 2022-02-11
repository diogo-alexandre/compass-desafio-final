import { Inject } from '@decorators/di'
import { Request, NextFunction } from 'express'
import { Controller, Post } from '@decorators/express'

import { HttpCode } from '../constants/http-code.contant'
import { IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IRentalService } from '../services/interfaces/rental-service.interface'
import { RentalService } from '../services/rental.service'
import { CreateRentalValidation } from '../validators/entities/rental/create-rental.validator'

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
}
