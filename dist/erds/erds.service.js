"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErdsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const erd_entity_1 = require("./entities/erd.entity");
let ErdsService = class ErdsService {
    erdRepository;
    constructor(erdRepository) {
        this.erdRepository = erdRepository;
    }
    async create(userId, createErdDto) {
        const erd = this.erdRepository.create({
            ...createErdDto,
            userId,
        });
        return this.erdRepository.save(erd);
    }
    async findAll(userId) {
        return this.erdRepository.find({
            where: { userId },
            order: { updatedAt: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const erd = await this.erdRepository.findOne({
            where: { id },
        });
        if (!erd) {
            throw new common_1.NotFoundException('ERD not found');
        }
        if (erd.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this ERD');
        }
        return erd;
    }
    async update(id, userId, updateErdDto) {
        const erd = await this.findOne(id, userId);
        Object.assign(erd, updateErdDto);
        return this.erdRepository.save(erd);
    }
    async remove(id, userId) {
        const erd = await this.findOne(id, userId);
        await this.erdRepository.remove(erd);
    }
};
exports.ErdsService = ErdsService;
exports.ErdsService = ErdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(erd_entity_1.Erd)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ErdsService);
//# sourceMappingURL=erds.service.js.map