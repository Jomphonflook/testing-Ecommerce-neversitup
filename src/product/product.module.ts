import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/mongo/mongo.module';
import { ProductProviders } from 'src/mongo/provider/product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...ProductProviders],
})
export class ProductModule {}
