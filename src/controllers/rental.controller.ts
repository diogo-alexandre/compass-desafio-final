import { Inject } from '@decorators/di'
import { Request, NextFunction } from 'express'
import { Controller, Delete, Get, Post, Put } from '@decorators/express'

import { HttpCode } from '../constants/http-code.contant'
import { IRentalDTO } from '../helpers/interfaces/entities/rental.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IRentalService } from '../services/interfaces/rental-service.interface'
import { RentalService } from '../services/rental.service'
import { CreateRentalValidation } from '../validators/rental/create-rental.validator'
import { IdParamValidation } from '../validators/param-id.validator'
import { EntityNotFound } from '../errors/entity-not-found.error'
import { NotFound } from '../errors/http/not-found-error'
import { FindAllRentalValidation } from '../validators/rental/findall-rental.validator'

@Controller('/rental')
export class RentalController {
  constructor (
    @Inject(RentalService)
    private readonly rentalService: IRentalService
  ) { }

  @Post('/', [CreateRentalValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rental: IRentalDTO = req.body
      const result = await this.rentalService.create(rental)

      return res.status(HttpCode.CREATED).json(result).end()
    } catch (err) {
      return next(err)
    }
  }

  @Get('/', [FindAllRentalValidation])
  async findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, offset, ...query } = req.query
      const { docs, ...pagination } = await this.rentalService.findAll(query, Number(limit), Number(offset))

      return res.status(HttpCode.OK).json({
        rentals: docs,
        total: pagination.totalDocs,
        limit: pagination.limit,
        offset: pagination.page,
        offsets: pagination.totalPages
      }).end()
    } catch (err) {
      return next(err)
    }
  }

  @Get('/:id', [IdParamValidation('id')])
  async findById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.rentalService.findById(id)

      return res.status(HttpCode.OK).json(result).end()
    } catch (err) {
      return next(err)
    }
  }

  @Put('/:id', [IdParamValidation('id'), CreateRentalValidation])
  async update (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const payload: IRentalDTO = req.body

      await this.rentalService.update(id, payload)

      return res.status(HttpCode.NO_CONTENT).end()
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return next(new NotFound(err.message))
      }

      return next(err)
    }
  }

  @Delete('/:id', [IdParamValidation('id')])
  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      await this.rentalService.delete(id)

      return res.status(HttpCode.NO_CONTENT).end()
    } catch (err) {
      return next(err)
    }
  }
}
