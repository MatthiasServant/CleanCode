import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString, Min } from "class-validator";
import { OrderItem } from "./order-item.entity";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  orderItems: OrderItem[];

  @Min(10)
  price: number;

  @IsString()
  status: string;
}