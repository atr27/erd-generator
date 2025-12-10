import { ErdsService } from './erds.service';
import { CreateErdDto, UpdateErdDto } from './dto/erd.dto';
export declare class ErdsController {
    private readonly erdsService;
    constructor(erdsService: ErdsService);
    create(req: any, createErdDto: CreateErdDto): Promise<import("./entities/erd.entity").Erd>;
    findAll(req: any): Promise<import("./entities/erd.entity").Erd[]>;
    findOne(req: any, id: string): Promise<import("./entities/erd.entity").Erd>;
    update(req: any, id: string, updateErdDto: UpdateErdDto): Promise<import("./entities/erd.entity").Erd>;
    remove(req: any, id: string): Promise<void>;
}
