import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/mongo/mongo.module';
import { OrderProviders } from 'src/mongo/provider/order.provider';
import { ProductModule } from 'src/product/product.module';
import { ProductProviders } from 'src/mongo/provider/product.provider';
import { UserProviders } from 'src/mongo/provider/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProviders, ...ProductProviders, ...UserProviders],
})
export class OrderModule {}
