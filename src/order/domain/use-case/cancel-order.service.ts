import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { CreateOrderDto } from "../entity/order-dto.entity";
import { OrderMapper } from "src/order/utils/order.mapper";
import { InjectRepository } from "@nestjs/typeorm";

export class CancelOrderService {
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository;

    async cancelOrder(orderId: string, cancelReason: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if(!order) {
            throw new Error('Order not found');
        }
        order.cancel(cancelReason);
        return this.orderRepository.save(order);
    }
}