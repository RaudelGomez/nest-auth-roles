import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authToken = req.cookies['authToken']?.access_token;
    if(!authToken){
      throw new UnauthorizedException('You dont have authorization to watch')
    }
    //halllo
    next();
  }
}
