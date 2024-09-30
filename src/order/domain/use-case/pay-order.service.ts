import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { CreateOrderDto } from "../entity/order-dto.entity";
import { OrderMapper } from "src/order/utils/order.mapper";
import { InjectRepository } from "@nestjs/typeorm";

export class PayOrderService {
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository;

  async payOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if(!order) {
      throw new Error('Order not found');
    }
    order.status = 'PAID';
    return this.orderRepository.save(order);
  }
}