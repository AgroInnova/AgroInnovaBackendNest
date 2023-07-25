import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MqttOptionsConfig } from 'src/Configs/mqttoptions';
import { MqttController } from './mqtt.controller';
import { TypeormsqliteModule } from 'src/typeormsqlite/typeormsqlite.module';
import { MqttService } from './mqtt.service';

const mqttoptions = new MqttOptionsConfig();

@Module({
  imports: [ClientsModule.register([mqttoptions]), TypeormsqliteModule],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
