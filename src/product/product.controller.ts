import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  //CREATE PRODUCT
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    return this.productService.create(createProductDto).then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //Get ALL product
  @Get()
  async getAllProduct(@Res() res: Response) {
    return this.productService.getAllProduct().then(val => {
      return res.status(val.result.status).send(val)
    })
  }

  //Get Product By Id
  @Get('/:id')
  async getProductById(@Param('id') id: string, @Res() res: Response) {
    return this.productService.getPrductById(id).then(val => {
      return res.status(val.result.status).send(val)
    })
  }
}
