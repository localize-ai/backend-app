import { Body, Controller, Get, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';
import { GetUsernameDto } from './dto/get-username.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Put('username')
  @UseGuards(JwtAuthGuard)
  async updateUsername(
    @Body() dto: UpdateUsernameDto,
    @Request() req,
  ) {
    return await this.usersService.updateUsername(req.user.id, dto.username);
  }

  @Get('username_exists')
  async getUsername(
    @Query() dto: GetUsernameDto,
  ) {
    return await this.usersService.isUsernameExists(dto.username);
  }
}
