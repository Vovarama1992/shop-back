import { IsPhoneNumber } from 'class-validator';

export class RequestCodeDto {
  @IsPhoneNumber()
  phone: string;
}
