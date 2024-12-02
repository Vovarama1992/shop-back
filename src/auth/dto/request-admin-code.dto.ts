import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestAdminCodeDto {
  @ApiProperty({
    description: 'Phone number of the admin user.',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Email of the admin user.',
    example: 'admin@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Admin password to authenticate the request.',
    example: 'adminpassword',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
