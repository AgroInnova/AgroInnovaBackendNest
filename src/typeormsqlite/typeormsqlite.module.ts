import { TypeOrmConfig } from './Configs/typeormconfig';
import { Module } from '@nestjs/common';
import { TypeormsqliteService } from './typeormsqlite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './EntityDto/module.entity';
import { PubSub } from 'graphql-subscriptions';
import { ModuleAguaEntity } from './EntityDto/moduleAgua.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([ModuleEntity, ModuleAguaEntity]),
  ],
  controllers: [],
  providers: [
    TypeormsqliteService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [TypeormsqliteService, 'PUB_SUB'],
})
export class TypeormsqliteModule {}
