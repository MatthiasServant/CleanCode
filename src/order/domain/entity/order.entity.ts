import { OrderItem } from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { CreateOrderDto } from './order-dto.entity';

@Entity()
export class Order {
  static readonly MAX_PRICE = 500;
  static readonly MIN_ITEMS = 3;
  static readonly MIN_PRICE = 10;
  static readonly SHIPPING_PRICE = 5;
  
  @CreateDateColumn()
  @Expose({ groups: ['group_orders'] })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_orders'] })
  id: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  price: number;

  @Column()
  @Expose({ groups: ['group_orders'] })
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddress: string | null;

  invoiceAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddressSetAt: Date | null;

  @Column()
  @Expose({ groups: ['group_orders'] })
  status: OrderStatus;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  paidAt: Date | null;

  constructor(createOrderDto: CreateOrderDto) {
    this.customerName = createOrderDto.customerName;
    this.orderItems = createOrderDto.orderItems;
    this.invoiceAddress = createOrderDto.invoiceAddress;
    this.shippingAddress = createOrderDto.shippingAddress;
    this.status = OrderStatus.PENDING;
    this.price = this.calculatePrice();
  }

  pay(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Order is not pending');
    }
    if (this.price > Order.MAX_PRICE) {
      throw new Error('Order price is too high');
    }
    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  deliver(): void {
    if (this.status !== OrderStatus.PAID) {
      throw new Error('Order is not paid');
    }
    if (this.orderItems.length < Order.MIN_ITEMS) {
      throw new Error('Order has less than 3 items');
    }
    this.status = OrderStatus.DELIVERED;
  }

  setShippingAddress(address: string): void {
    this.shippingAddress = address;
    this.price += Order.SHIPPING_PRICE;
    this.shippingAddressSetAt = new Date();
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  calculatePrice(): number {
    const price = this.orderItems.reduce((acc, item) => acc + item.price, 0);
    if (price < Order.MIN_PRICE) {
      throw new Error('Order price is too high');
    }
    return price;
  }
}
