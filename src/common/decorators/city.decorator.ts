import { SetMetadata } from '@nestjs/common';

export const CityDecorator = (...city: string[]) => SetMetadata('city', city);
