import { Controller, Get, Post } from '@decorators/express'
import { NextFunction, Request, Response } from 'express'

import { ICar } from '../models/car.model'
import { HttpCode } from '../constant/http-code.contant'
import { ICarService } from '../services/interfaces/car-service.interface'
import { CarCreateValidation } from '../validators/car/car-create.validator'
import { Inject } from '@decorators/di'
import { CarService } from '../services/car.service'

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

  @Get('/')
  async findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, offset, ...query } = req.query
      const { result, ...pagination } = await this.carService.findAll(
        query as unknown as Partial<ICar>,
        Number(limit),
        Number(offset)
      )

      res
        .status(HttpCode.OK)
        .json({
          veiculos: result,
          ...pagination
        })
    } catch (error) {
      next(error)
    }
  }
}
