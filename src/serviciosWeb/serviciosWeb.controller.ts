import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ServiciosWebService } from './serviciosWeb.service';
import { CreateServiciosWebDto } from './dto/create-serviciosWeb.dto';
import { UpdateServiciosWebDto } from './dto/update-serviciosWeb.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('serviciosWeb')
export class ServiciosWebController {
  constructor(private serviciosWebService: ServiciosWebService) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createServiciosWeb(@Body() newServciosWeb: CreateServiciosWebDto) {
    return this.serviciosWebService.createServiciosWeb(newServciosWeb);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  updateServiciosWeb(
    @Param('id', ParseIntPipe) id: number,
    @Body() newServiciosWeb: UpdateServiciosWebDto,
  ) {
    return this.serviciosWebService.updateServiciosWeb(id, newServiciosWeb);
  }

  @UseGuards(JwtUserGuard)
  @Get('/:id')
  getServiciosWebById(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosWebService.getServiciosWebById(id);
  }

  @UseGuards(JwtUserGuard)
  @Get('country/:countryId')
  async findActiveByCountry(@Param('countryId') countryId: number) {
    return this.serviciosWebService.findActiveByCountry(countryId);
  }
}
