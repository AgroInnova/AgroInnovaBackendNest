import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './EntityDto/module.entity';
import { ModuleDTO } from 'src/mqtt/MqttDTOs/ModuleDto';

@Injectable()
export class TypeormsqliteService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async CreateModule(module: ModuleDTO) {
    const newModule = await this.moduleRepository.create(module);
    const savedModule = await this.moduleRepository.save(newModule);
    console.log('Module saved TypeORM success: ', savedModule);
  }

  async findAll(): Promise<ModuleEntity[]> {
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
