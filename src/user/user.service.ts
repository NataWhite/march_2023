import { HttpException, Injectable } from '@nestjs/common';
import { UserCreateProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
  // const users = [];
  private users = [];

  constructor() {}

  async createUser(userData: UserCreateProfileDto) {
    // if (userData.age < 18) {
    //   throw HttpException();
    // }
    console.log(userData);

    // add id to user
    this.users.push(userData);
    return this.users;
  }

  async getOneUser(userId: string) {
    return this.users.find((item) => item.id === Number(userId))[0];
  }

  async getUsersList() {
    return this.users;
  }
}
