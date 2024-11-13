import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetUsernameDto {

    @ApiProperty()
    @IsString()
    username: string;
}