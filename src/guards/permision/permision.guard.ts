import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';

import { jwtConstants } from 'src/users/users.constants';

@Injectable()
export class PermisionGuard implements CanActivate {

  constructor(private reflector: Reflector, private jwt:JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirePermission = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!requirePermission){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authToken= request.cookies['authToken']?.access_token;
    if(!authToken){
      throw new UnauthorizedException();
    }
    const decodeTok = await this.jwt.verifyAsync(authToken,{secret: jwtConstants.secret});
    return requirePermission.some((role) => decodeTok.roles?.includes(role));
  }
}
