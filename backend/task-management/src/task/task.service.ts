import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-list.response';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Create a task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.PENDING,
    });
    return await this.taskRepository.save(task);
  }

  // Fetch all tasks
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getAllTasksByPagination(filterDto: GetTasksFilterDto): Promise<Task[]> {
  const { status, search, page = 1, limit = 10 } = filterDto; 
  const query = this.taskRepository.createQueryBuilder('task');

  if (status) {
    query.andWhere('task.status = :status', { status });
  }

  if (search) {
    query.andWhere(
      '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
      { search: `%${search}%` },
    );
  }
  const offset = (page - 1) * limit;

  query.take(limit);
  query.skip(offset);

  return await query.getMany();
}


  // Fetch a specific task
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async getTaskCountsByStatus(): Promise<Record<string, number>> {
  const result = await this.taskRepository.createQueryBuilder('task')
    .select('task.status', 'status')
    .addSelect('COUNT(task.id)', 'count')
    .groupBy('task.status')
    .getRawMany();
    return result.reduce((acc, row) => {
    acc[row.status] = parseInt(row.count, 10);
    return acc;
  }, {} as Record<string, number>);
}
}
