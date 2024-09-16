import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordService {

  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async recoverPasswordhash(password: string, hash:string): Promise<boolean>{
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

}
