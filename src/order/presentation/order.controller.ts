import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderDto } from '../domain/entity/order-dto.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';

@Controller('/orders')
export default class OrderController {

  constructor(private readonly createOrderService: CreateOrderService) {}
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post()
  createOrder(@Res() res: Response, @Body() order: CreateOrderDto) {
    return this.createOrderService.createOrder(order)
  }
}
