import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])], //allows the dependency injection!
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
