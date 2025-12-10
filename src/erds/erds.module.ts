import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErdsController } from './erds.controller';
import { ErdsService } from './erds.service';
import { Erd } from './entities/erd.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Erd]),
        AuthModule,
    ],
    controllers: [ErdsController],
    providers: [ErdsService],
    exports: [ErdsService],
})
export class ErdsModule { }
