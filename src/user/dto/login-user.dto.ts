import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsString } from "class-validator"

export class LoginDto {
    @IsDefined()
    @IsString()
    @ApiProperty({ example: "benzema007" })
    username: string

    @IsDefined()
    @IsString()
    @ApiProperty({ example: "xy234786" })
    password: string
}