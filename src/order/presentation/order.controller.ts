import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderDto } from '../domain/entity/order-dto.entity';

@Controller('/orders')
export default class OrderController {
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post()
  createOrder(@Res() res: Response, @Body() order: CreateOrderDto) {
  return res.status(HttpStatus.CREATED).json({
      result: 'OK'
    })
  }
}
