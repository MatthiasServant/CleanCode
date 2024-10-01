import { CreateOrderDto } from "../domain/entity/order-dto.entity";
import { Order } from "../domain/entity/order.entity";

export class OrderMapper {
  static dtoToOrder(dto: CreateOrderDto): Partial<Order> {
    return {
      customerName: dto.customerName,
      price: dto.price,
      orderItems: dto.orderItems,
      shippingAddress: dto.shippingAddress,
      invoiceAddress: dto.invoiceAddress,
    };
  }
}