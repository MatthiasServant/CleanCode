import { Injectable } from '@nestjs/common';
import { OrderItem } from './order/domain/entity/order-item.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloAgain() {
    return 'Hello World Again!';
  }
}
