import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { RequestCodeDto } from './dto/request-code.dto';
import { RequestAdminCodeDto } from './dto/request-admin-code.dto';
import { LoginDto } from './dto/auth.dto';
import { RedisService } from '../redis/redis.service'; // импортируем RedisService
import { SmsService } from '../sms/sms.service';
import { Role } from '@prisma/client';
//import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private smsService: SmsService,
  ) {}

  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/[^\d]/g, '');
  }

  async register(registerDto: RegisterDto) {
    const {
      email,
      phone,
      name,
      middleName,
      surName,
      isSubscribed,
      isAdmin,
      password,
    } = registerDto;

    const role = isAdmin ? Role.ADMIN : Role.USER;
    this.logger.log('role while creating: ' + role);
    const cleanPhone = this.cleanPhoneNumber(phone);

    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone: cleanPhone }] },
    });
    if (existingUser && existingUser.isApproved) {
      throw new HttpException(
        'Email or phone number already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existingUser && !existingUser.isApproved) {
      await this.prisma.user.delete({
        where: {
          id: existingUser.id,
        },
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        phone: cleanPhone,
        name,
        middleName,
        surName,
        isSubscribed,
        isApproved: false,
        password: password || '',
        role,
      },
    });

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await this.redisService.setCode(user.id, code);

    this.logger.log(`Sending SMS to ${phone}`);
    try {
      await this.smsService.sendSms(
        phone,
        `Умная Одежда. Ваш код подтверждения ${code}. Никому его не сообщайте!`,
      );
      this.logger.log(`SMS sent successfully to ${phone}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phone}: ${error.message}`);
      throw new HttpException(
        'Error sending SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { userId: user.id };
  }

  async confirmRegistration(confirmCodeDto: ConfirmCodeDto) {
    const { phone, code } = confirmCodeDto;
    const cleanPhone = this.cleanPhoneNumber(phone);
    const user = await this.prisma.user.findUnique({
      where: { phone: cleanPhone },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const storedCode = await this.redisService.getCode(user.id);
    if (!storedCode || storedCode !== code) {
      throw new HttpException(
        'Invalid or expired code',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isApproved: true },
    });

    await this.redisService.deleteCode(user.id);

    return { message: 'User confirmed successfully' };
  }

  async requestCode(requestCodeDto: RequestCodeDto) {
    const { phone } = requestCodeDto;
    const cleanPhone = this.cleanPhoneNumber(phone);
    const user = await this.prisma.user.findUnique({
      where: { phone: cleanPhone },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (!user.isApproved) {
      throw new HttpException('User not approved', HttpStatus.FORBIDDEN);
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await this.redisService.deleteCode(user.id);

    await this.redisService.setCode(user.id, code);

    await this.smsService.sendSms(
      phone,
      `Умная Одежда. Ваш код подтверждения ${code}. Никому его не сообщайте!`,
    );

    return { message: 'Code sent successfully' };
  }

  async requestAdminCode(requestAdminCodeDto: RequestAdminCodeDto) {
    const { email, password } = requestAdminCodeDto;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    {
      /*if (user.role !== Role.ADMIN) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }*/
    }

    if (password !== user.password) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await this.redisService.deleteCode(user.id);

    await this.redisService.setCode(user.id, code);

    const phone = user.phone;
    const cleanPhone = this.cleanPhoneNumber(phone);
    this.logger.log(`Sending SMS to ${phone}`);
    try {
      await this.smsService.sendSms(
        cleanPhone,
        `УО Админ. Ваш код подтверждения ${code}. Никому его не сообщайте!`,
      );
      this.logger.log(`SMS sent successfully to ${phone}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phone}: ${error.message}`);
      throw new HttpException(
        'Error sending SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Code sent successfully', phone };
  }

  async login(loginDto: LoginDto) {
    const { code } = loginDto;

    const stored = await this.redisService.getCodeByCode(code);
    this.logger.log('stored: ' + stored);
    if (!stored) {
      throw new HttpException(
        'Invalid or expired code',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userId = stored.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    this.logger.log('finded user: ' + user);
    if (!user || !user.isApproved) {
      throw new HttpException(
        'User not found or not confirmed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user.id, phone: user.phone };
    const token = this.jwtService.sign(payload);

    await this.redisService.deleteCode(userId);

    return { access_token: token, user };
  }
}
