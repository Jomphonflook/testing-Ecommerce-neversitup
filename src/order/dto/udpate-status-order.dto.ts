import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum } from "class-validator";
import { StatusOrderEnum } from "src/mongo/interface/order.interface";

export class UpdateStatusOrderDto {
    @IsDefined()
    @IsEnum(StatusOrderEnum)
    @ApiProperty({ example: "paid" })
    status : string
}