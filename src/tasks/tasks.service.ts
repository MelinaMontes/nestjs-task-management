import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ){}

  async getTaskById(id: string): Promise < Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Try again! this ID "${id}" is not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string):Promise <void> {
    const result = await this.tasksRepository.delete(id);
   console.log(result);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise <Task>{

    const task =await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto);
  }

}
