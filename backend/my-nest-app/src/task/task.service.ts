import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async updateTask(id: number, updateTaskDto: any): Promise<Task | null> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOneBy({ id });
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task ${id} not found`);
  }

  async getStats(): Promise<{
    totalTasks: number;
    completedTasks: number;
    openTasks: number;
  }> {
    const [totalTasks, completedTasks, openTasks] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.count({ where: { status: 'DONE' } }),
      this.taskRepository.count({ where: { status: 'OPEN' } }),
    ]);

    return {
      totalTasks,
      completedTasks,
      openTasks,
    };
  }
}
