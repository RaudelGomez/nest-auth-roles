import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/users.constants';

@Injectable()
export class JwtServices {
  constructor(private readonly jwt: JwtService){}

  async signToken(payload: {}): Promise<{}>{
    return {
      access_token: await this.jwt.signAsync(payload)
    }
  }
}
