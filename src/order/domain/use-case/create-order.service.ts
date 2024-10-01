import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { CreateOrderDto } from "../entity/order-dto.entity";
import { OrderMapper } from "src/order/utils/order.mapper";
import { InjectRepository } from "@nestjs/typeorm";

export class CreateOrderService {
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository;

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = OrderMapper.dtoToOrder(dto);
    order.calculatePrice();
    return this.orderRepository.create(order);
  }
}