import { Inject } from '@decorators/di'
import { NextFunction, Request, Response } from 'express'
import { Controller, Delete, Get, Post } from '@decorators/express'

import { ICar } from '../helpers/interfaces/car.interface'
import { CarService } from '../services/car.service'
import { HttpCode } from '../constant/http-code.contant'
import { ICarService } from '../services/interfaces/car-service.interface'
import { CarCreateValidation } from '../validators/car/car-create.validator'
import { CarFindAllValidation } from '../validators/car/car-findall.validator'
import { ParamIdValidation } from '../validators/param-id.validator'

@Controller('/car')
export class CarController {
  constructor (
    @Inject(CarService)
    private readonly carService: ICarService
  ) { }

  @Post('/', [CarCreateValidation])
  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body: ICar = req.body
      const car = await this.carService.create(body)

      res
        .status(HttpCode.CREATED)
        .json(car)
    } catch (error) {
      next(error)
    }
  }

  @Get('/', [CarFindAllValidation])
  async findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, offset, ...query } = req.query

      const {
        docs,
        totalDocs,
        page,
        totalPages,
        limit: pagLimit
      } = await this.carService.findAll(query, Number(limit), Number(offset))

      res.status(HttpCode.OK).json({
        veiculos: docs,
        total: totalDocs,
        limit: pagLimit,
        offset: page,
        offsets: totalPages
      })
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:id', [ParamIdValidation])
  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      await this.carService.delete(id)

      res
        .status(HttpCode.NO_CONTENT)
        .end()
    } catch (error) {
      next(error)
    }
  }

  @Get('/:id', [ParamIdValidation])
  async findById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const car = await this.carService.findById(id)

      res
        .status(HttpCode.OK)
        .json(car)
    } catch (error) {
      next(error)
    }
  }
}
