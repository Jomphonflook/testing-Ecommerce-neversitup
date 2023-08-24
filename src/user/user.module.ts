import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/mongo/mongo.module';
import { UserProviders } from 'src/mongo/provider/user.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: 'Sx59mzoV2WJJZCtJhQuq',
    signOptions: { expiresIn: '3600s' },
  })],
  controllers: [UserController],
  providers: [UserService,
    ...UserProviders],
})
export class UserModule { }
