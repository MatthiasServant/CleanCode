import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto } from '../domain/entity/order-dto.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { PayOrderService } from '../domain/use-case/pay-order.service';
import { SetAddressesService } from '../domain/use-case/set-addresses.service';
import { CancelOrderService } from '../domain/use-case/cancel-order.service';

@Controller('/orders')
export default class OrderController {

  constructor(private readonly cancelOrderService: CancelOrderService, private readonly createOrderService: CreateOrderService, private readonly payOrderService: PayOrderService, private readonly a: SetAddressesService) {}
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

  @Post('/:orderId/cancel')
  cancelOrder(@Param('orderId') orderId: string, @Body('cancelReason') cancelReason: string) {
    return this.cancelOrderService.cancelOrder(orderId, cancelReason);
  }

  @Put('/:orderId/shipping-address')
  setShippingAddress(@Param('orderId') orderId: string, @Body('address') address: string) {
    return this.a.setShippingAddress(orderId, address);
  }

  @Put('/:orderId/invoice-address')
  setInvoiceAddress(@Param('orderId') orderId: string, @Body('address') address: string) {
    return this.a.setInvoiceAddress(orderId, address);
  }
}
