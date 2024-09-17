import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/enums/roles.enum';
import { HashPasswordService } from 'src/hash-password.service';
import { LoginDto } from './dto/login-user.dto';
import { JwtServices } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashPasswordService: HashPasswordService,
    private readonly jwtServices: JwtServices
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('That email is not available');
    }
    const pass = await this.hashPasswordService.hashPassword(createUserDto.password);
    const userOk = await this.prismaService.user.create({
      data: {...createUserDto, password: pass, roles: [Role.USER]},
    });
    const { password, roles, ...result } = userOk;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {email: loginDto.email}
    });
    if(!user){
      throw new UnauthorizedException('The user dont exist');
    }
    const passRecover = await this.hashPasswordService.recoverPasswordhash(loginDto.password, user.password);
    if(!passRecover){
      throw new UnauthorizedException('The password is incorrect');
    }
    const payload = {user: user.email, roles: user.roles}
    const token = await this.jwtServices.signToken(payload)
    return {token: token, email: user.email};
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        roles: [Role.USER],
      },
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
