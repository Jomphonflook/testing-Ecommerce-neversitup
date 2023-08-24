import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsEmail, IsString } from "class-validator"

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @IsEmail()
    @ApiProperty({ example: "aj@ymail.com" })
    email: string

    @IsDefined()
    @IsString()
    @ApiProperty({ example: "benzema007" })
    username: string

    @IsDefined()
    @IsString()
    @ApiProperty({ example: "3567xy" })
    password: string
}
