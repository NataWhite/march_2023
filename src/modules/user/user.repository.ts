import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserListOrderFieldEnum } from './enum/user-list-order-field.enum';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('user');

    switch (query.orderBy) {
      case UserListOrderFieldEnum.createdAt:
        queryBuilder.orderBy('user.createdAt', query.order);
        break;
      case UserListOrderFieldEnum.age:
        queryBuilder.orderBy('user.age', query.order);
        break;
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
