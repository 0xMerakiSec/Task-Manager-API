import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CommonService {
  constructor() {}
  //Todo: Implement common service methods for Jwt and password hash

  async passwordHash(saltRound: number, password: string): Promise<string> {
    return await bcrypt.hash(password, saltRound);
  }
  async verifyPasswordHash(hash: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
