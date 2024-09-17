import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PermisionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    // const request = context.switchToHttp().getRequest();
    // const authToken= request.cookies['authToken'];
    // console.log('token', authToken);
    console.log('persmision');

    // if (!authToken) {
    //   console.log('No token found, blocking access');
    //   return false; // No permite acceso si no hay token
    // }
    
    return false;
  }
}
