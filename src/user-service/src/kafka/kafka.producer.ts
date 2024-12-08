import { Kafka } from 'kafkajs';

export class KafkaProducer {
  private kafka = new Kafka({
    clientId: 'nestjs-service',
    brokers: ['kafka:9093'],
  });

  private producer = this.kafka.producer();

  constructor() {
    this.producer.connect();
  }

  async sendCode(phone: string, code: string, isAdmin: boolean) {
    const messageText = isAdmin
      ? `УО Админ. Ваш код подтверждения ${code}. Никому его не сообщайте!`
      : `Умная Одежда. Ваш код подтверждения ${code}. Никому его не сообщайте!`;
    await this.producer.send({
      topic: 'request-code',
      messages: [
        {
          value: JSON.stringify({
            phone,
            code,
            isAdmin,
            messageText,
          }),
        },
      ],
    });
  }
}
