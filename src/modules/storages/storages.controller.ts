import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';
import { UploadDto } from './dto/upload-storage.dto';

@Controller('storages')
@ApiTags('storages')
export class StoragesController {

  constructor(
    private readonly storagesService: StoragesService,
  ) { }

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('presign')
  async getPresign(@Query() dto: UploadDto) {
    return this.storagesService.getPresign(dto);
  }

}
