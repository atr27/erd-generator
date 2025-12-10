import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Erd } from './entities/erd.entity';
import { CreateErdDto, UpdateErdDto } from './dto/erd.dto';

@Injectable()
export class ErdsService {
    constructor(
        @InjectRepository(Erd)
        private erdRepository: Repository<Erd>,
    ) { }

    async create(userId: string, createErdDto: CreateErdDto): Promise<Erd> {
        const erd = this.erdRepository.create({
            ...createErdDto,
            userId,
        });
        return this.erdRepository.save(erd);
    }

    async findAll(userId: string): Promise<Erd[]> {
        return this.erdRepository.find({
            where: { userId },
            order: { updatedAt: 'DESC' },
        });
    }

    async findOne(id: string, userId: string): Promise<Erd> {
        const erd = await this.erdRepository.findOne({
            where: { id },
        });

        if (!erd) {
            throw new NotFoundException('ERD not found');
        }

        if (erd.userId !== userId) {
            throw new ForbiddenException('You do not have access to this ERD');
        }

        return erd;
    }

    async update(id: string, userId: string, updateErdDto: UpdateErdDto): Promise<Erd> {
        const erd = await this.findOne(id, userId);
        Object.assign(erd, updateErdDto);
        return this.erdRepository.save(erd);
    }

    async remove(id: string, userId: string): Promise<void> {
        const erd = await this.findOne(id, userId);
        await this.erdRepository.remove(erd);
    }
}
