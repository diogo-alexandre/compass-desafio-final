import { Inject } from '@decorators/di'
import { NextFunction, Request } from 'express'
import { Controller, Delete, Get, Patch, Post, Put } from '@decorators/express'

import { CarService } from '../services/car.service'
import { HttpCode } from '../constants/http-code.contant'
import { ICarDTO } from '../helpers/interfaces/entities/car.interface'
import { Response } from '../helpers/interfaces/response.interface'
import { IdParamValidation } from '../validators/param-id.validator'
import { ICarService } from '../services/interfaces/car-service.interface'
import { CarCreateValidation } from '../validators/car/car-create.validator'
import { CarFindAllValidation } from '../validators/car/car-findall.validator'
import { EntityNotFound } from '../errors/entity-not-found.error'
import { NotFound } from '../errors/http/not-found-error'
import { Authenticate } from '../middlewares/authenticate.middleware'

@Controller('/car', [Authenticate])
export class CarController {
  constructor (
    @Inject(CarService)
    private readonly carService: ICarService
  ) { }

  @Post('/', [CarCreateValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const car: ICarDTO = req.body
      const result = await this.carService.create(car)

      return res.status(HttpCode.CREATED).json(result).end()
    } catch (err) {
      return next(err)
    }
  }

  @Get('/', [CarFindAllValidation])
  async findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, offset, ...query } = req.query
      const { docs, ...pagination } = await this.carService.findAll(query, Number(limit), Number(offset))

      return res.status(HttpCode.OK).json({
        veiculos: docs,
        total: pagination.totalDocs,
        limit: pagination.limit,
        offset: pagination.page,
        offsets: pagination.totalPages
      }).end()
    } catch (err) {
      return next(err)
    }
  }

  @Delete('/:id', [IdParamValidation('id')])
  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      await this.carService.delete(id)

      return res.status(HttpCode.NO_CONTENT).end()
    } catch (err) {
      return next(err)
    }
  }

  @Get('/:id', [IdParamValidation('id')])
  async findById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const car = await this.carService.findById(id)

      return res.status(HttpCode.OK).json(car).end()
    } catch (err) {
      let localError = err

      if (err instanceof EntityNotFound) {
        localError = new NotFound(err.message)
      }

      return next(localError)
    }
  }

  @Put('/:id', [IdParamValidation('id'), CarCreateValidation])
  async update (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const car: ICarDTO = req.body

      await this.carService.update(id, car)

      return res.status(HttpCode.NO_CONTENT).end()
    } catch (err) {
      return next(err)
    }
  }

  @Patch('/:carId/acessorios/:acessorioId', [IdParamValidation('carId', 'acessorioId')])
  async updateAcessorio (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { carId, acessorioId } = req.params
      const acessorio = req.body

      await this.carService.updateAcessorio(carId, acessorioId, acessorio)

      return res.status(HttpCode.NO_CONTENT).end()
    } catch (err) {
      return next(err)
    }
  }
}
