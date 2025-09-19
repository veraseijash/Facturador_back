import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatusPrefacturaService } from './status_prefactura.service';
import { CreateStatusPrefacturaDto } from './dto/create-status_prefactura.dto';
import { UpdateStatusPrefacturaDto } from './dto/update-status_prefactura.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('statusPrefactura')
export class StatusPrefacturaController {
  constructor(private statusPrefacturaService: StatusPrefacturaService) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createStatusPrefactura(
    @Body() newStatusPrefactura: CreateStatusPrefacturaDto,
  ) {
    return this.statusPrefacturaService.createStatusPrefactura(
      newStatusPrefactura,
    );
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  updateStatusPrefactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() newStatusPrefactura: UpdateStatusPrefacturaDto,
  ) {
    return this.statusPrefacturaService.updateStatusPrefactura(
      id,
      newStatusPrefactura,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('/:id')
  getStatusPrefacturaById(@Param('id', ParseIntPipe) id: number) {
    return this.statusPrefacturaService.getStatusPrefacturaById(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async deleteStatusPrefactura(@Param('id', ParseIntPipe) id: number) {
    return await this.statusPrefacturaService.deleteStatusPrefactura(id);
  }
}
