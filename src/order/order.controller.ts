import { Controller, Get, Post, Body, Param, UseGuards, Put, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UpdateStatusOrderDto } from './dto/udpate-status-order.dto';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  //CREATE ORDER
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    return this.orderService.create(createOrderDto).then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //GET LIST ORDER BY USER ID
  @Get('/get-list-order/:id')
  async getListOrderByUserId(@Param('id') id: string, @Res() res: Response) {
    return this.orderService.getListOrder(id).then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //CANCEL ORDER
  @Post('/cancel-order/:id')
  async cancelOrder(@Param('id') id: string, @Res() res: Response) {
    return this.orderService.cancelOrder(id).then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //Get Order By Order ID
  @Get('/:id')
  async getOrderById(@Param('id') id: string, @Res() res: Response) {
    await this.orderService.getOrderById(id).then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //update status order
  @Put('/update-status-order/:id')
  async updateStatusOrder(
    @Param('id') id: string,
    @Body() input: UpdateStatusOrderDto,
    @Res() res: Response
  ) {
    await this.orderService.updateStatusOrder(id, input).then(val => {
      return res.status(val.result.status).send(val)
    })
  }
}
