import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUsernameDto {

    @ApiProperty()
    @IsString()
    username: string;
}