import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePlaceReviewsDto {

    @ApiProperty()
    @IsNumber()
    rating: number;

    @ApiProperty()
    @IsString()
    review: string;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
        },
    })
    @IsString({ each: true })
    images: string[];
}