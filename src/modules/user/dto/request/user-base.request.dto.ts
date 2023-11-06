import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UserBaseRequestDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message:
      'Password must contain at least 8 characters, 1 uppercase letter and 1 digit.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  city: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UserLoginDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
