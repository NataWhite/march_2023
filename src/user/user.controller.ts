import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import {UserCreateProfileDto, UserCreateResponse} from './dto/user.dto';
import {ApiExtraModels, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/entities/user.entity";

@ApiTags('User')
@ApiExtraModels(UserCreateResponse)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  async getAllUsers() {
    return this.userService.getUsersList();
  }

  @Get('/:userId/profile')
  async getUserInfo(@Param() param: { userId: string }) {
    return this.userService.getOneUser(param.userId);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @Post('create')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    return res
        .status(HttpStatus.CREATED)
        .json(await this.userService.createUser(body));
  }

  @Post('/address/:id')
  async addUserAddress() {}

  @Post('/city/:id')
  async updateUserData() {}

  @Delete(':id')
  async deleteUserAccount() {}
}
