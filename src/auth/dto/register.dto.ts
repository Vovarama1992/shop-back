import { IsString, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  middleName: string;

  @IsString()
  surName: string;

  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  isSubscribed: boolean;
}
