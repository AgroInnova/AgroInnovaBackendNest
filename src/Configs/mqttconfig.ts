import { MqttOptions, Transport } from '@nestjs/microservices';

export const MqttConfig: MqttOptions = {
  transport: Transport.MQTT,
  options: {
    subscribeOptions: { qos: 1 },
    url: 'mqtt://10.1.0.2:1883',
  },
};
