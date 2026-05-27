import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './task/task.module';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: String('pgedb'),
      database: 'postgres',
      entities: [Task],
    }),
    TasksModule,
  ],
})
export class AppModule {}
