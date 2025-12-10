"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErdsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const erds_controller_1 = require("./erds.controller");
const erds_service_1 = require("./erds.service");
const erd_entity_1 = require("./entities/erd.entity");
const auth_module_1 = require("../auth/auth.module");
let ErdsModule = class ErdsModule {
};
exports.ErdsModule = ErdsModule;
exports.ErdsModule = ErdsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([erd_entity_1.Erd]),
            auth_module_1.AuthModule,
        ],
        controllers: [erds_controller_1.ErdsController],
        providers: [erds_service_1.ErdsService],
        exports: [erds_service_1.ErdsService],
    })
], ErdsModule);
//# sourceMappingURL=erds.module.js.map