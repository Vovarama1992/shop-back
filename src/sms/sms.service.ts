import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  private apiUrl = 'https://ssl.bs00.ru/'; // URL для запросов

  constructor() {}

  async sendSms(phone: string, text: string): Promise<void> {
    const apiKey = process.env.REPLACEMENT;
    const senderName = 'MyBrandName';

    const url = `${this.apiUrl}?method=push_msg&key=${apiKey}&text=${encodeURIComponent(
      text,
    )}&phone=${encodeURIComponent(phone)}&sender_name=${senderName}`;

    try {
      const response = await axios.get(url);
      if (response.data.response.msg.err_code !== '0') {
        throw new HttpException(
          `Error sending SMS: ${response.data.response.msg.text}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error connecting to SMS service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
