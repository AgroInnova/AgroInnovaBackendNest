import { TypeOrmConfig } from './../Configs/typeormconfig';
import { Module } from '@nestjs/common';
import { TypeormsqliteService } from './typeormsqlite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './EntityDto/module.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([ModuleEntity]),
  ],
  controllers: [],
  providers: [TypeormsqliteService],
  exports: [TypeormsqliteService],
})
export class TypeormsqliteModule {}
