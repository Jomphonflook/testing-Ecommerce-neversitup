import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

import { DatabaseModule } from './mongo/mongo.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [UserModule, ProductModule, DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
