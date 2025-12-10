import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateErdDto } from './dto/generate.dto';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('generate')
    async generate(@Body() generateErdDto: GenerateErdDto) {
        return this.aiService.generateERD(generateErdDto.prompt);
    }
}
