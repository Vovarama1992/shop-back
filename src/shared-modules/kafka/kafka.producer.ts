import { Injectable } from '@nestjs/common';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  async sendCode(phone: string, code: string, isAdmin: boolean) {
    const messageText = isAdmin
      ? `УО Админ. Ваш код подтверждения ${code}. Никому его не сообщайте!`
      : `Умная Одежда. Ваш код подтверждения ${code}. Никому его не сообщайте!`;

    this.kafkaClient.emit('request-code', {
      phone,
      messageText,
    });
  }
}
