import { ITaskUseCase } from "../../../src/domain/usecases/task/task.usecase";
import { ITask } from "../../../src/domain/models/task/task";

import { describe, it, beforeEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";

describe("TaskUseCase", () => {
  let taskUseCase: ITaskUseCase;
  let mockTask: ITask;

  beforeEach(() => {
    taskUseCase = {
      create: jest.fn<(userId: string, task: ITask) => Promise<ITask>>(),
      findAll: jest.fn<(userId: string) => Promise<ITask[]>>(),
      findOne: jest.fn<(userId: string, taskId: string) => Promise<ITask>>(),
      update:
        jest.fn<
          (userId: string, taskId: string, task: ITask) => Promise<ITask>
        >(),
      remove: jest.fn<(userId: string, taskId: string) => Promise<ITask>>(),
    };
    mockTask = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    } as ITask;
  });

  it("should create a task", async () => {
    (taskUseCase.create as jest.Mock).mockReturnValueOnce(mockTask);
    const result = await taskUseCase.create("user1", mockTask);
    expect(result).toEqual(mockTask);
    expect(taskUseCase.create).toHaveBeenCalledWith("user1", mockTask);
  });

  it("should find all tasks for a user", async () => {
    (taskUseCase.findAll as jest.Mock).mockReturnValueOnce([mockTask]);
    const result = await taskUseCase.findAll("user1");
    expect(result).toEqual([mockTask]);
    expect(taskUseCase.findAll).toHaveBeenCalledWith("user1");
  });

  it("should find a task by id", async () => {
    (taskUseCase.findOne as jest.Mock).mockReturnValueOnce(mockTask);
    const result = await taskUseCase.findOne("user1", "1");
    expect(result).toEqual(mockTask);
    expect(taskUseCase.findOne).toHaveBeenCalledWith("user1", "1");
  });

  it("should update a task", async () => {
    const updatedTask = { ...mockTask, title: "Updated Task" };
    (taskUseCase.update as jest.Mock).mockReturnValueOnce(updatedTask);
    const result = await taskUseCase.update("user1", "1", updatedTask);
    expect(result).toEqual(updatedTask);
    expect(taskUseCase.update).toHaveBeenCalledWith("user1", "1", updatedTask);
  });

  it("should remove a task", async () => {
    (taskUseCase.remove as jest.Mock).mockReturnValueOnce(mockTask);
    const result = await taskUseCase.remove("user1", "1");
    expect(result).toEqual(mockTask);
    expect(taskUseCase.remove).toHaveBeenCalledWith("user1", "1");
  });
});
