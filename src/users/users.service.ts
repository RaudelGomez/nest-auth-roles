import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'enums/roles.enum';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService){}

  create(createUserDto: CreateUserDto) {
      return this.prismaService.user.create({
      data: {
        ...createUserDto, roles: [Role.USER]
      }
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
