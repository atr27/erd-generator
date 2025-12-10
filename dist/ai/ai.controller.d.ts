import { AiService } from './ai.service';
import { GenerateErdDto } from './dto/generate.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    generate(generateErdDto: GenerateErdDto): Promise<import("./ai.service").ERDSchema>;
}
