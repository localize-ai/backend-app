import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class CreatePlaceRequestsDto {

    @ApiProperty()
    @IsUrl()
    url?: string;
}