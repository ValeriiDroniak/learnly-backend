import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private users = [
    {
      id: 1,
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: bcrypt.hashSync('ivan123', 10),
      role: 'student',
      isActivate: true,
      createdAt: new Date('2023-01-15T10:00:00Z'),
    },
    {
      id: 2,
      name: 'Dmytro',
      email: 'dmytro@gmail.com',
      password: bcrypt.hashSync('dmytro123', 10),
      role: 'admin',
      isActivate: false,
      createdAt: new Date('2023-05-01T09:00:00Z'),
    },
    {
      id: 3,
      name: 'Vasyl',
      email: 'vasyl@gmail.com',
      password: bcrypt.hashSync('vasyl123', 10),
      role: 'teacher',
      isActivste: false,
      createdAt: new Date('2023-03-10T08:15:00Z'),
    },
  ];

  findAll() {
    const date = new Date('2023-01-15T10:00:00Z');
    console.log('date :>> ', date);
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const { name, email, password, role } = dto;

    const existing = this.users.find((u) => u.email === email);

    if (existing) {
      throw new BadRequestException('Користувач з таким email вже існує');
    }

    const newUser = {
      id: this.users.length + 1,
      name,
      email,
      password: await this.hashedPassword(password),
      role,
      isActivate: false,
      createdAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async update(id: number, dto: UpdateUserDto) {
    const { name, email, password, role } = dto;
    const user = this.findById(id);

    user.name = name;
    user.email = email;
    user.password = await this.hashedPassword(password);
    user.role = role;

    return user;
  }

  async patchUpdate(id: number, dto: Partial<UpdateUserDto>) {
    const user = this.findById(id);

    if (dto.password) {
      dto.password = await this.hashedPassword(dto.password);
    }

    Object.assign(user, dto);

    return user;
  }

  delete(id: number) {
    const user = this.findById(id);

    this.users = this.users.filter((u) => u.id !== user.id);

    return 'Користувача було видалено';
  }
}
