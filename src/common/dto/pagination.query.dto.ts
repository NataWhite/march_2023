import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export abstract class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 20;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number = 0;
}
