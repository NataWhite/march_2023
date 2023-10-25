import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UserCreateProfileDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true, example: 'userTeast@gamil.com'})
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false, example: 'Lviv'})
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UserUpdateDto {}

export class UserCreateResponse extends UserCreateProfileDto{
  // @ApiProperty()
  // userName: string;
  // @ApiProperty()
  // email: string;
  // @ApiProperty()
  // city: string;
  // @ApiProperty()
  // age: number;
  // @ApiProperty()
  // status: boolean;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  id: string;
}
