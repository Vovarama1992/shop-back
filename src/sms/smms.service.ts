import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor() {}
  formatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  async sendSms(phone: string, text: string): Promise<void> {
    const login = 'intorder@maxiscomfort.ru';
    const password = 'y0N65vt)L5BH';

    const senderName = 'maxiscomf.ru';

    const formattedPhone = this.formatPhoneNumber(phone);

    const params = {
      method: 'push_msg',
      email: login,
      password: password,
      text: text,
      phone: formattedPhone,
      sender_name: senderName,
      format: 'json',
    };

    try {
      const url = 'https://ssl.bs00.ru/';
      const response = await axios.post(url, querystring.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('SMS service response:', response.data);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
}
