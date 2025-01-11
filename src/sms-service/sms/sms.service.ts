import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class SmsService {
  private apiUrl = 'https://ssl.bs00.ru/';
  private readonly logger = new Logger(SmsService.name);

  constructor() {}

  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/[^\d]/g, '');
  }

  async sendSms(
    phone: string,
    text: string,
    priority: number = 2,
    setAsideTime?: number,
    timeZone: string = 'local',
  ): Promise<void> {
    const apiKey = process.env.SMS_KEY;
    const senderName = 'maxicomf.ru';

    const cleanedPhone = this.cleanPhoneNumber(phone);

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      this.logger.error(`Invalid phone number format: ${cleanedPhone}`);
      throw new HttpException(
        `Invalid phone number format: ${cleanedPhone}`,
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

    this.logger.log(`Sending SMS to ${cleanedPhone} with text: "${text}"`);

    const params = {
      method: 'push_msg',
      key: apiKey,
      text: text,
      phone: cleanedPhone,
      sender_name: senderName,
      priority: priority,
      format: 'json',
      set_aside_time: setAsideTime ? setAsideTime : undefined,
      time: timeZone === 'local' ? 'local' : undefined,
    };

    const url = `${this.apiUrl}?${querystring.stringify(params)}`;
    this.logger.log(`Request URL: ${url}`);

    try {
      const response = await axios.get(url);

      this.logger.log(`SMS service response: ${JSON.stringify(response.data)}`);

      const { err_code, text: errorMessage } = response.data.response.msg;
      if (err_code !== '0') {
        this.logger.error(
          `Error sending SMS: ${errorMessage} (error code: ${err_code})`,
        );

        if (err_code === '101') {
          this.logger.error(`Incorrect phone number: ${cleanedPhone}`);
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
