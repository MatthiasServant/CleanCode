import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto } from '../domain/entity/order-dto.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { PayOrderService } from '../domain/use-case/pay-order.service';

@Controller('/orders')
export default class OrderController {

  constructor(private readonly createOrderService: CreateOrderService, private readonly payOrderService: PayOrderService) {}
  @Get()
  async getOrders() {
    return 'All orders';
  }

  @Post()
  createOrder(@Body() order: CreateOrderDto) {
    return this.createOrderService.createOrder(order)
  }

  @Put('/:orderId')
  payOrder(@Param('orderId') orderId: string) {
    return this.payOrderService.payOrder(orderId);
  }
}
