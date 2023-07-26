/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './EntityDto/module.entity';
import { ModuleDTO } from 'src/mqtt/MqttDTOs/ModuleDto';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class TypeormsqliteService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  async CreateModule(module: ModuleDTO): Promise<ModuleEntity> {
    const newModule = this.moduleRepository.create(module);
    const savedModule = await this.moduleRepository.save(newModule);
    if (!savedModule) throw new Error('Error saving module');
    else {
      this.pubSub.publish('moduleAdded', { moduleAdded: savedModule });
      return savedModule;
    }
  }

  async findAll(): Promise<ModuleEntity[]> {
    const query = this.moduleRepository
      .createQueryBuilder('Modules')
      .select('id')
      .addSelect('moduleId')
      .addSelect('temperature')
      .addSelect('humidity')
      .addSelect('valve')
      .addSelect('dateTime')
      .getRawMany<ModuleEntity>();
    return query;
  }
  async findLast(): Promise<ModuleEntity[]> {
    const query = this.moduleRepository
      .createQueryBuilder('modules')
      .select('id')
      .addSelect('moduleId')
      .addSelect('temperature')
      .addSelect('humidity')
      .addSelect('valve')
      .addSelect('MAX(dateTime)', 'dateTime')
      .groupBy('moduleId')
      .getRawMany<ModuleEntity>();
    return query;
  }

  async findLastXModulo(
    ammount: number,
    id_provided: number,
  ): Promise<ModuleEntity[]> {
    return this.moduleRepository.find({
      where: { moduleId: id_provided },
      order: { id: 'DESC' },
      take: ammount,
    });
  }
}
