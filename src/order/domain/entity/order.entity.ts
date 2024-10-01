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

@Entity()
export class Order {
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

  pay(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Order is not pending');
    }
    if (this.price > 500) {
      throw new Error('Order price is too high');
    }
    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  deliver(): void {
    this.status = OrderStatus.DELIVERED;
  }

  setShippingAddress(address: string): void {
    this.shippingAddress = address;
    this.shippingAddressSetAt = new Date();
  }

  setPending(): void {
    this.status = OrderStatus.PENDING;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  calculatePrice(): void {
    const price = this.orderItems.reduce((acc, item) => acc + item.price, 0);
    if (price < 10) {
      throw new Error('Order price is too high');
    }
    this.setPending();
    this.setPrice(price);
  }
}
