import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
  category?: string;
}
