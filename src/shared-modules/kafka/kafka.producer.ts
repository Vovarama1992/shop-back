import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.connectToKafka();
  }

  private async connectToKafka() {
    try {
      this.logger.log('Connecting to Kafka...');
      await this.kafkaClient.connect();
      this.logger.log('Kafka connected successfully.');
    } catch (error) {
      this.logger.error(`Kafka connection error: ${error.message}`);
      this.retryKafkaConnection();
    }
  }

  private async retryKafkaConnection(retries = 10, delay = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.logger.log(`Retrying Kafka connection (Attempt ${attempt})...`);
        await this.kafkaClient.connect();
        this.logger.log('Kafka connected successfully.');
        return;
      } catch (error) {
        this.logger.error(
          `Kafka connection attempt ${attempt} failed: ${error.message}`,
        );
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          this.logger.error('All Kafka connection attempts failed.');
        }
      }
    }
  }

  async sendCode(phone: string, code: string, isAdmin: boolean) {
    const messageText = isAdmin
      ? `УО Админ. Ваш код подтверждения ${code}. Никому его не сообщайте!`
      : `Умная Одежда. Ваш код подтверждения ${code}. Никому его не сообщайте!`;

    try {
      this.kafkaClient.emit('request-code', {
        phone,
        messageText,
      });
      this.logger.log(`Message sent to Kafka for phone: ${phone}`);
    } catch (error) {
      this.logger.error(
        `Failed to send message to Kafka for phone: ${phone}: ${error.message}`,
      );
    }
  }
}
