import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  private apiUrl = 'https://ssl.bs00.ru/'; // URL для запросов
  private readonly logger = new Logger(SmsService.name); // Логгер для класса

  constructor() {}

  async sendSms(phone: string, text: string): Promise<void> {
    const apiKey =
      process.env.REPLACEMENT || 'yR062691440655cb0b0793bfa8f7189dc205c7fdf5d896ae';
    const senderName = 'MyBrandName';

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      this.logger.error(`Invalid phone number format: ${phone}`);
      throw new HttpException(
        `Invalid phone number format: ${phone}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!text || text.trim().length === 0) {
      this.logger.error('Message text is empty');
      throw new HttpException(
        'Message text cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log('sending apikey: ' + apiKey);

    const url = `${this.apiUrl}?method=push_msg&key=${apiKey}&text=${encodeURIComponent(
      text,
    )}&phone=${encodeURIComponent(phone)}&sender_name=${senderName}`;

    this.logger.log(`Sending SMS to ${phone} with text: "${text}"`);
    this.logger.log(`Request URL: ${url}`);

    try {
      const response = await axios.get(url);

      this.logger.log(`SMS service response: ${JSON.stringify(response.data)}`);

      const errorCode = response.data.response.msg.err_code;
      if (errorCode !== '0') {
        const errorMessage = response.data.response.msg.text;
        this.logger.error(
          `Error sending SMS: ${errorMessage} (error code: ${errorCode})`,
        );

        if (errorCode === '101') {
          this.logger.error(`Incorrect phone number: ${phone}`);
        }

        throw new HttpException(
          `Error sending SMS: ${errorMessage}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.log('SMS sent successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`Error connecting to SMS service: ${error.message}`);
      } else {
        this.logger.error(`Unknown error: ${error}`);
      }

      throw new HttpException(
        'Error connecting to SMS service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
