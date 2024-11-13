import { Controller, Get, Query } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { ApiTags } from '@nestjs/swagger';
import { UploadDto } from './dto/upload-storage.dto';

@Controller('storages')
@ApiTags('storages')
export class StoragesController {

  constructor(
    private readonly storagesService: StoragesService,
  ) { }

  @Get('presign')
  async getPresign(@Query() dto: UploadDto) {
    return this.storagesService.getPresign(dto);
  }

}
