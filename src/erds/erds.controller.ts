import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ErdsService } from './erds.service';
import { CreateErdDto, UpdateErdDto } from './dto/erd.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('erds')
@UseGuards(JwtAuthGuard)
export class ErdsController {
    constructor(private readonly erdsService: ErdsService) { }

    @Post()
    create(@Request() req, @Body() createErdDto: CreateErdDto) {
        return this.erdsService.create(req.user.id, createErdDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.erdsService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        return this.erdsService.findOne(id, req.user.id);
    }

    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateErdDto: UpdateErdDto) {
        return this.erdsService.update(id, req.user.id, updateErdDto);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.erdsService.remove(id, req.user.id);
    }
}
