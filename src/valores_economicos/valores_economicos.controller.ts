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
import { ValoresEconomicosService } from './valores_economicos.service';
import { CreateValoresEconomicosDto } from './dto/create-valores_economicos.dto';
import { UpdateValoresEconomicosDto } from './dto/update-valores_economicos.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('valoresEconomicos')
export class ValoresEconomicosController {
  constructor(private valoresEconomicosService: ValoresEconomicosService) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createValoresEconomicos(
    @Body() newValoresEconomicos: CreateValoresEconomicosDto,
  ) {
    return this.valoresEconomicosService.createValoresEconomicos(
      newValoresEconomicos,
    );
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  updateValoresEconomicos(
    @Param('id', ParseIntPipe) id: number,
    @Body() newValoresEconomicos: UpdateValoresEconomicosDto,
  ) {
    return this.valoresEconomicosService.updateValoresEconomicos(
      id,
      newValoresEconomicos,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('/list')
  async getValoresEconomicos() {
    return this.valoresEconomicosService.getValoresEconomicos();
  }

  @UseGuards(JwtUserGuard)
  @Get('/:id')
  getValoresEconomicosById(@Param('id', ParseIntPipe) id: number) {
    return this.valoresEconomicosService.getValoresEconomicosById(id);
  }
}
