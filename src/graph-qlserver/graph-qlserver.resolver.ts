import {
  Args,
  Query,
  Resolver,
  Int,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { ModuleObjectType } from './ObjectTypes/moduleOT';
import { TypeormsqliteService } from 'src/typeormsqlite/typeormsqlite.service';
import { MqttService } from 'src/mqtt/mqtt.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class GraphQlserverResolver {
  constructor(
    private typeOrmService: TypeormsqliteService,
    private mqttservice: MqttService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [ModuleObjectType], { name: 'RetreiveAllModules' })
  async modules() {
    return this.typeOrmService.findAll();
  }
  @Query(() => [ModuleObjectType], { name: 'LastXModule' })
  async LastXModules(
    @Args('ammount', { type: () => Int }) ammount: number,
    @Args('Id', { type: () => Int }) Id: number,
  ) {
    return this.typeOrmService.findLastXModulo(ammount, Id);
  }
  @Mutation(() => Boolean)
  async changeValve(
    @Args('moduleId', { type: () => Int }) moduleId: number,
    @Args('ValveState', { type: () => Int }) ValveState: boolean,
  ) {
    const message = JSON.parse(JSON.stringify({ moduleId, ValveState }));
    this.mqttservice.sendMqttMessage(`modulo/valve`, message);
  }
  @Mutation(() => Boolean)
  async changePump(@Args('PumpState', { type: () => Int }) PumpState: boolean) {
    const message = JSON.parse(JSON.stringify({ PumpState }));
    this.mqttservice.sendMqttMessage(`modulo/pump`, message);
  }

  @Subscription(() => ModuleObjectType, { name: 'moduleAdded' })
  async moduleUpdate() {
    return this.pubSub.asyncIterator('moduleAdded');
  }
}
