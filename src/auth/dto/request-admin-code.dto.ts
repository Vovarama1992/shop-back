import { IsString, IsNotEmpty } from 'class-validator';

export class RequestAdminCodeDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
