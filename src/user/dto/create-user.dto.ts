import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export class CreateUserDto {
  @ApiProperty({
    description: "Ім'я користувача",
    example: 'Tanasii',
  })
  @IsString({ message: "Поле Ім'я повинно бути рядком" })
  @IsNotEmpty({ message: "Поле Ім'я не може бути пустим" })
  @MinLength(3, { message: "Поле Ім'я повинно бути мінімум з 3 символів" })
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'tanasii@gmail.com',
  })
  @IsEmail({}, { message: 'Некоректний email' })
  @IsNotEmpty({ message: 'Email не може бути пустим' })
  email: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'Tanasii3232',
  })
  @IsString({ message: 'Пароль повинен бути рядком' })
  @MinLength(8, { message: 'Пароль повинен бути мінімум 8 символів' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message: 'Пароль повинен мати хочаб одну велику літеру та цифру',
  })
  password: string;

  @ApiProperty({
    description: "Ім'я користувача",
    example: 'student',
    type: 'integer',
  })
  @IsEnum(UserRole, {
    message: 'Поле ролі повинно бути: admin, student, teacher',
  })
  role: UserRole;
}
