import { IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmCodeDto {
  @ApiProperty({
    description: 'Phone number associated with the registration.',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Confirmation code sent to the phone number.',
    example: '12345',
  })
  @IsString()
  @Length(5, 5)
  code: string;
}
