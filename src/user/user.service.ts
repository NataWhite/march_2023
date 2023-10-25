import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UserCreateProfileDto } from './dto/user.dto';
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
  // const users = [];
  private users = [];

  constructor(
      private readonly userRepository: UserRepository,
  ) {}

  async createUser(userData: UserCreateProfileDto) {
    const userEmail = userData.email.trim();
    const findUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }
    try {
      const newUser = this.userRepository.create(userData);
      if (!userData.city) {
        newUser.city = 'Odessa';
      }
      return this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST)
    }
  }

  async getOneUser(userId: string) {
    return this.users.find((item) => item.id === Number(userId))[0];
  }

  async getUsersList() {
    return this.users;
  }
}
