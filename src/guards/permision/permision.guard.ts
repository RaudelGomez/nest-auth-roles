import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PermisionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);

    return true;
  }
}
