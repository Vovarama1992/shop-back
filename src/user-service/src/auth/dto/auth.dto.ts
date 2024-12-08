import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(5, 5)
  code: string;
}
