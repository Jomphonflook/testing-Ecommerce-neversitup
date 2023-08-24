import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
    @IsDefined()
    @IsString()
    @ApiProperty({ example: "userId"})
    userId: string

    @IsDefined()
    @IsString()
    @ApiProperty({ example: "productId" })
    productId: string

    @IsDefined()
    @IsNumber()
    @ApiProperty({ example: 20 })
    amount: number
}
