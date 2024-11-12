import { IsEnum } from "class-validator";
import { PlaceEnum } from "../enum/place.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetPlacesCategoryDto {

    constructor(data = {}) {
        Object.assign(this, data);
    }

    @ApiProperty({
        enum: PlaceEnum,
    })
    @IsEnum(PlaceEnum)
    category: PlaceEnum;
}