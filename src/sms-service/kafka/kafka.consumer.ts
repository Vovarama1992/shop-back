import { Kafka } from 'kafkajs';
import { SmsService } from '../sms/sms.service';

export class KafkaConsumer {
  private kafka = new Kafka({
    clientId: 'nestjs-consumer',
    brokers: ['kafka:9093'],
  });

  private consumer = this.kafka.consumer({ groupId: 'nestjs-consumer-group' });

  constructor(private readonly smsService: SmsService) {
    this.connect();
  }

  public async connect() {
    await this.consumer.connect();
    console.log('Kafka Consumer connected!');
    await this.consumeMessages();
  }

  public async consumeMessages() {
    await this.consumer.subscribe({
      topic: 'request-code',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const { userId, phone, code } = JSON.parse(
          message.value?.toString() || '{}',
        );
        console.log(`Received message on ${topic}:`, userId, phone, code);

        await this.sendSms(phone, `Ваш код подтверждения: ${code}`);
      },
    });
  }

  async sendSms(phone: string, text: string) {
    console.log(`Sending SMS to ${phone}: ${text}`);
    await this.smsService.sendSms(phone, text);
  }

  public async disconnect() {
    await this.consumer.disconnect();
    console.log('Kafka Consumer disconnected!');
  }
}
