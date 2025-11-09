import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Отримати список користувачів',
    description: 'Повертає список користувачів',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Отримати користувача за допомогою ID',
    description: 'Повертає інформацію про користувача',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @ApiOperation({
    summary: 'Створити користувача',
    description: 'Повертає інформацію про створеного користувача',
  })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({
    summary: 'Оновлення користувача',
    description: 'Повертає інформацію про оновленого користувача',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Оновлення будь якого поля у користувача',
    description: 'Повертає інформацію про оновленого користувача',
  })
  @Patch(':id')
  patchUpdate(@Param('id') id: string, @Body() dto: Partial<UpdateUserDto>) {
    return this.userService.patchUpdate(+id, dto);
  }

  @ApiOperation({
    summary: 'Видалення користувача',
    description: 'Повертає інформацію про успішне видалення користувача',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
