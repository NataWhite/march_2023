import { UserListQueryRequestDto } from '../request/user-list-query.request.dto';

export class UserListResponseDto extends UserListQueryRequestDto {
  data: UserListItemResponseDto[];
  total: number;
}

export class UserListItemResponseDto {
  id: string;
  userName: string;
  age: number;
  createdAt: Date;
}
