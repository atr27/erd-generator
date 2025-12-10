import { Repository } from 'typeorm';
import { Erd } from './entities/erd.entity';
import { CreateErdDto, UpdateErdDto } from './dto/erd.dto';
export declare class ErdsService {
    private erdRepository;
    constructor(erdRepository: Repository<Erd>);
    create(userId: string, createErdDto: CreateErdDto): Promise<Erd>;
    findAll(userId: string): Promise<Erd[]>;
    findOne(id: string, userId: string): Promise<Erd>;
    update(id: string, userId: string, updateErdDto: UpdateErdDto): Promise<Erd>;
    remove(id: string, userId: string): Promise<void>;
}
