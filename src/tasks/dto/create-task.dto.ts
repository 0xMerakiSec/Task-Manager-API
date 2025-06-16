import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTaskDto {
  @Type(() => String)
  @IsString()
  title: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  status?: string;
}
