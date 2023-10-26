import { IsEnum, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../../../common/dto/pagination.query.dto';
import { OrderEnum } from '../../../../common/enum/order.enum';
import { UserListOrderFieldEnum } from '../../enum/user-list-order-field.enum';

export class UserListQueryRequestDto extends PaginationQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum = OrderEnum.ASC;

  @IsEnum(UserListOrderFieldEnum)
  @IsOptional()
  orderBy?: UserListOrderFieldEnum = UserListOrderFieldEnum.createdAt;
}
