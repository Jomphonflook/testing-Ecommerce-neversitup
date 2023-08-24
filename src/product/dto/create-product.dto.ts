
import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsDefined()
    @IsString()
    @ApiProperty({ example: "milk" })
    name: string

    @IsDefined()
    @IsNumber()
    @ApiProperty({ example: 199 })
    price: number

    @IsDefined()
    @IsNumber()
    @ApiProperty({ example: 200 })
    amount: number
}
