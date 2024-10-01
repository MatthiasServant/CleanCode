import OrderRepository from "src/order/infrastructure/order.repository";
import { Order } from "../entity/order.entity";
import { CreateOrderDto } from "../entity/order-dto.entity";
import { OrderMapper } from "src/order/utils/order.mapper";
import { InjectRepository } from "@nestjs/typeorm";

export class SetAddressesService {
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository;

    async setShippingAddress(orderId: string, address: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if(!order) {
            throw new Error('Order not found');
        }
        order.setShippingAddress(address);
        return this.orderRepository.save(order);
    }

    async setInvoiceAddress(orderId: string, address: string | null): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if(!order) {
            throw new Error('Order not found');
        }
        order.setInvoiceAddress(address);
        return this.orderRepository.save(order);
    }
}