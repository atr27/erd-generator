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
exports.ErdsController = void 0;
const common_1 = require("@nestjs/common");
const erds_service_1 = require("./erds.service");
const erd_dto_1 = require("./dto/erd.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ErdsController = class ErdsController {
    erdsService;
    constructor(erdsService) {
        this.erdsService = erdsService;
    }
    create(req, createErdDto) {
        return this.erdsService.create(req.user.id, createErdDto);
    }
    findAll(req) {
        return this.erdsService.findAll(req.user.id);
    }
    findOne(req, id) {
        return this.erdsService.findOne(id, req.user.id);
    }
    update(req, id, updateErdDto) {
        return this.erdsService.update(id, req.user.id, updateErdDto);
    }
    remove(req, id) {
        return this.erdsService.remove(id, req.user.id);
    }
};
exports.ErdsController = ErdsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, erd_dto_1.CreateErdDto]),
    __metadata("design:returntype", void 0)
], ErdsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ErdsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ErdsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, erd_dto_1.UpdateErdDto]),
    __metadata("design:returntype", void 0)
], ErdsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ErdsController.prototype, "remove", null);
exports.ErdsController = ErdsController = __decorate([
    (0, common_1.Controller)('erds'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [erds_service_1.ErdsService])
], ErdsController);
//# sourceMappingURL=erds.controller.js.map