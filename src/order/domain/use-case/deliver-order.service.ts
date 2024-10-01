import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { CreateOrderDto } from "../entity/order-dto.entity";
import { OrderMapper } from "src/order/utils/order.mapper";
import { InjectRepository } from "@nestjs/typeorm";

export class DeliverOrderService {
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository;

    async deliverOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if(!order) {
            throw new Error('Order not found');
        }
        order.deliver();
        return this.orderRepository.save(order);
    }

    async setShippingAddress(orderId: string, address: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if(!order) {
            throw new Error('Order not found');
        }
        order.setShippingAddress(address);
        return this.orderRepository.save(order);
    }
}