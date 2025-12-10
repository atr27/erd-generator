import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ErdsModule } from './erds/erds.module';
import { AiModule } from './ai/ai.module';
import { User } from './users/entities/user.entity';
import { Erd } from './erds/entities/erd.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Erd],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    AuthModule,
    ErdsModule,
    AiModule,
  ],
})
export class AppModule { }
