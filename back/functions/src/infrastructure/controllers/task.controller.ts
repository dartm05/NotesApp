import { Request, Response } from "express";
import { ITaskUseCase } from "../../domain/usecases/task/task.usecase";
import { TaskService } from "../../application/services/task.service";
import { TaskDrivenAdapter } from "../driven-adapters/task.driven.adapter";

export class TaskController {
  static async create(
    { params: { userId }, body }: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {
    const taskService = serviceInjection();
    const success = await taskService.create(userId, body);
    res.json(success);
  }

  static async findAll(
    { params: { userId } }: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {
    const taskService = serviceInjection();
    const tasks = await taskService.findAll(userId);
    res.json(tasks);
  }

  static async findOne(
    { params: { userId, id } }: Request<{ userId: string; id: string }>,
    res: Response
  ): Promise<void> {
    const taskService = serviceInjection();
    const task = await taskService.findOne(userId, id);
    res.json(task);
  }

  static async update(
    { params: { userId, id }, body }: Request<{ userId: string; id: string }>,
    res: Response
  ): Promise<void> {
    const taskService = serviceInjection();
    const success = await taskService.update(userId, id, body);
    res.json(success);
  }

  static async remove(
    { params: { userId, id } }: Request<{ userId: string; id: string }>,
    res: Response
  ): Promise<void> {
    const taskService = serviceInjection();
    const success = await taskService.remove(userId, id);
    res.json(success);
  }
}

function serviceInjection(): ITaskUseCase {
  const taskDrivenAdapter = new TaskDrivenAdapter();
  const taskService = new TaskService(taskDrivenAdapter);
  return taskService;
}
