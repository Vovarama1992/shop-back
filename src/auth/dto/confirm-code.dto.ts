import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class ConfirmCodeDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @Length(5, 5)
  code: string;
}
