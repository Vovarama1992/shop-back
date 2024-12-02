import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestCodeDto {
  @ApiProperty({
    description: 'Phone number for which the verification code is requested.',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phone: string;
}
