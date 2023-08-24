import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Model } from 'mongoose';
import { IOrder, StatusOrderEnum } from 'src/mongo/interface/order.interface';
import { IProduct } from 'src/mongo/interface/product.interface';
import { IResponse } from 'src/mongo/interface/common.interface';
import { IUser } from 'src/mongo/interface/user.interface';
import { UpdateStatusOrderDto } from './dto/udpate-status-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL')
    private OrderModel: Model<IOrder>,
    @Inject('PRODUCT_MODEL')
    private ProductModel: Model<IProduct>,
    @Inject('USER_MODEL')
    private UserModel: Model<IUser>
  ) {

  }
  
  async create(createOrderDto: CreateOrderDto): Promise<IResponse> {
    const productId = createOrderDto.productId
    const inputAmount = createOrderDto.amount
    const product = await this.ProductModel.findById(productId);
    if (!product) {
      return {
        result: {
          status: HttpStatus.NOT_FOUND,
          message: "Product Not Found"
        }
      }
    }

    if (product.amount < inputAmount) {
      return {
        result: {
          status: HttpStatus.BAD_REQUEST,
          message: "Insufficient product inputAmount"
        }
      }
    }
    const order = {
      userId: createOrderDto.userId,
      productId: createOrderDto.productId,
      amount: inputAmount,
      status: StatusOrderEnum.WAITING_FOR_PAYMENT
    }
    const resultOrder = await new this.OrderModel(order).save()
    if (!resultOrder) {
      return {
        result: {
          status: HttpStatus.BAD_REQUEST,
          message: "Something Wrong About Order"
        }
      }
    }
    await this.ProductModel.findByIdAndUpdate(
      product._id,
      { $inc: { amount: -inputAmount } },
      { new: true }
    )
    return {
      result: {
        status: HttpStatus.OK,
        message: "Order Success",
        data: [resultOrder]
      }
    }

  }

  async getListOrder(id: string): Promise<IResponse> {
    const result = await this.OrderModel.find({
      userId: id
    })
    return {
      result : {
        status : 200,
        message : "list order by user id",
        data : result
      }
    }
  }

  async cancelOrder(id: string): Promise<IResponse> {
    const checkStatus = await this.OrderModel.findById(id)
    if (checkStatus.status === StatusOrderEnum.CANCELED) {
      return {
        result: {
          status: HttpStatus.BAD_REQUEST,
          message: "Order already Cancel"
        }
      }
    }
    const result = await this.OrderModel.findByIdAndUpdate(id, {
      status: StatusOrderEnum.CANCELED
    })
    if (!result.amount) {
      return {
        result: {
          status: HttpStatus.BAD_REQUEST,
          message: "Something Wrong About Cancel Order"
        },
      }
    }
    await this.ProductModel.findByIdAndUpdate(
      result.productId,
      { $inc: { amount: +result.amount } },
      { new: true }
    )
    return {
      result: {
        status: HttpStatus.OK,
        message: "Cancel Order Success"
      },
    }
  }

  async getOrderById(id: string): Promise<IResponse> {
    const result = await this.OrderModel.findById(id)
    const userId = result.userId
    const productId = result.productId
    const resultUser = await this.UserModel.findById(userId)
    const resultProduct = await this.ProductModel.findById(productId)
    const res = {
      username: resultUser.username,
      productName: resultProduct.name,
      orderDetail: result
    }
    return {
      result: {
        status: 200,
        message: "detail order",
        data: [res]
      }
    }
  }

  async updateStatusOrder(id: string, input: UpdateStatusOrderDto) : Promise<IResponse> {
    const order = await this.OrderModel.findById(id)
    const currentStatus = order.status
    const checkStatus = currentStatus === StatusOrderEnum.CANCELED ? "ORDER CANCELED" : currentStatus === StatusOrderEnum.PAID ? "ORDER PAID" : true
    console.log(checkStatus)
    if (checkStatus !== true) {
      return {
        result : {
          status : HttpStatus.OK,
          message : checkStatus
        }
      }
    }
    const result = await this.OrderModel.findByIdAndUpdate(id, input, {new : true})
    return {
      result : {
        status : HttpStatus.OK,
        message : "update status order success",
        data : [result]
      }
    }
  }
}
