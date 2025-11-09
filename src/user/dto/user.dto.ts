import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from './create-user.dto';

export class UserResponse {
  @ApiProperty({
    description: 'ID користувача',
    example: 23535,
  })
  @IsNumber()
  id: 1;

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
  email: 'ivan@gmail.com';

  @ApiProperty({
    description: 'Пароль',
    example: 'Tanasii3232',
  })
  @IsString({ message: 'Пароль повинен бути рядком' })
  @MinLength(8, { message: 'Пароль повинен бути мінімум 8 символів' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message: 'Пароль повинен мати хочаб одну велику літеру та цифру',
  })
  password: '$2b$10$mcRf0eTM7sPj2kf.LpC8feN7gUlB5wsfGpFZ/hYwFZDzc3Zl1Io.2';

  @ApiProperty({
    description: "Ім'я користувача",
    example: 'student',
    type: 'string',
  })
  @IsEnum(UserRole, {
    message: 'Поле ролі повинно бути: admin, student, teacher',
  })
  role: 'student';

  isActivate: true;

  createdAt: '2023-01-15T10:00:00.000Z';
}
