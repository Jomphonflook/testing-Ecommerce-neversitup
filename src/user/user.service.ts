import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private UserModel: Model<IUser>,
    private jwtService: JwtService
    
  ) { }

  async create(createUserDto: CreateUserDto): Promise<{ id: string }> {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash
    const resultCreateUser = await new this.UserModel(createUserDto).save();
    return {
      id: resultCreateUser.id
    };
  }

  async login(login: LoginDto) {
    const findUser = await this.UserModel.findOne({username: login.username}).select({
      password: 1,
      username: 1,
      email: 1
    })
    if(!findUser){
      throw new UnauthorizedException("Login Failed");
    }
    const isMatch = await bcrypt.compare(login.password, findUser.password);
    if(!isMatch){
      throw new UnauthorizedException("Login Failed");
    }
    const payload = { id: findUser.id, username: findUser.username, email: findUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: string) {
    const result = this.UserModel.findById(id).select({
      password: 0
    })
    return result
  }

}
