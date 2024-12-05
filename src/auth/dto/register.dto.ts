import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email of the user.',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Is Admin',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description: 'User’s first name.',
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User’s middle name.',
    example: 'Michael',
  })
  @IsString()
  middleName: string;

  @ApiProperty({
    description: 'User’s surname.',
    example: 'Doe',
  })
  @IsString()
  surName: string;

  @ApiProperty({
    description: 'Phone number of the user.',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Indicates if the user has subscribed to marketing emails.',
    example: true,
  })
  @IsBoolean()
  isSubscribed: boolean;
}
