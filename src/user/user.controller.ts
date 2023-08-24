import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  //REGISTER
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //LOGIN
  @Post('/login')
  login(@Body() loginInput: LoginDto){
    return this.userService.login(loginInput);
  }

  //PROFILE
  @Post('/profile/:id')
  profile(@Param('id') id : string){
    return this.userService.profile(id)
  }
}
