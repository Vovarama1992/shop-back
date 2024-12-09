import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SmsService } from 'src/sms-service/sms/sms.service';

@Controller()
export class KafkaConsumerController {
  private readonly logger = new Logger(KafkaConsumerController.name);

  constructor(private readonly smsService: SmsService) {}

  @EventPattern('request-code')
  async handleRequestCode(@Payload() message: any) {
    const { phone, messageText } = message;

    this.logger.log(`Processing message for phone: ${phone}`);

    await this.smsService.sendSms(phone, messageText);

    this.logger.log(`SMS sent to phone: ${phone}`);
  }
}
