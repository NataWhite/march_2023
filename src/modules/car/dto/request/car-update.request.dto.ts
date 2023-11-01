import { IsInt, Max, Min } from 'class-validator';

export class CarUpdateRequestDto {
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsInt()
  price: number;
}
