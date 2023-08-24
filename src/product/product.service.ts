import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from 'src/mongo/interface/product.interface';
import { Model } from 'mongoose';
import { IResponse } from 'src/mongo/interface/common.interface';

@Injectable()
export class ProductService {

  constructor(
    @Inject('PRODUCT_MODEL')
    private ProductModel: Model<IProduct>
  ) { }

  async create(createProductDto: CreateProductDto): Promise<IResponse> {
    const resultCreateProduct = await new this.ProductModel(createProductDto).save()
    return {
      result: {
        status: 200,
        message: "create product",
        data: [resultCreateProduct]
      }
    }
  }

  async getAllProduct(): Promise<IResponse> {
    const result = await this.ProductModel.find()
    return {
      result: {
        status: 200,
        message: "get all product",
        data: result
      }
    }
  }

  async getPrductById(id: string): Promise<IResponse> {
    const result = await this.ProductModel.findById(id)
    return {
      result: {
        status: 200,
        message: "get all product",
        data: [result]
      }
    }
  }
}
