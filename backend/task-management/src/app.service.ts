import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("Username",process.env.DB_USERNAME)
    return 'Hello World!';
  }
}
