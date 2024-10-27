import { Request, Response } from "express";
import { TaskController } from "../../../src/infrastructure/controllers/task.controller";
import { TaskService } from "../../../src/application/services/task.service";
import { TaskNotCreatedError } from "../../../src/domain/errors/task-not-created";
import { TasksNotFoundError } from "../../../src/domain/errors/tasks-not-found";
import { TaskNotDeletedError } from "../../../src/domain/errors/task-not-deleted.error";
import { TaskNotUpdatedError } from "../../../src/domain/errors/task-not-updated.error";

import { describe, it, beforeEach, expect, jest } from "@jest/globals";

jest.mock("../../../src/application/services/task.service");

describe("TaskController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: { userId: "1", id: "1" },
            body: { title: "Test Task" },
        };
        res = {
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("create", () => {
        it("should create a task successfully", async () => {
            const taskService = TaskService.prototype;
            taskService.create = jest.fn().mockResolvedValue(true);

            await TaskController.create(req as Request, res as Response, next);

            expect(taskService.create).toHaveBeenCalledWith("1", expect.objectContaining({ title: "Test Task" }));
            expect(res.json).toHaveBeenCalledWith(true);
        });

        it("should handle task creation failure", async () => {
            const taskService = TaskService.prototype;
            taskService.create = jest.fn().mockResolvedValue(false);

            await TaskController.create(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new TaskNotCreatedError());
        });
    });

    describe("findAll", () => {
        it("should return all tasks", async () => {
            const tasks = [{ createdAt: "2023-01-01T00:00:00Z" }, { createdAt: "2023-01-02T00:00:00Z" }];
            const taskService = TaskService.prototype;
            taskService.findAll = jest.fn().mockResolvedValue(tasks);

            await TaskController.findAll(req as Request, res as Response, next);

            expect(taskService.findAll).toHaveBeenCalledWith("1");
            expect(res.json).toHaveBeenCalledWith(tasks);
        });

        it("should handle no tasks found", async () => {
            const taskService = TaskService.prototype;
            taskService.findAll = jest.fn().mockResolvedValue(null);

            await TaskController.findAll(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new TasksNotFoundError());
        });
    });

    describe("findOne", () => {
        it("should return a single task", async () => {
            const task = { id: "1", title: "Test Task" };
            const taskService = TaskService.prototype;
            taskService.findOne = jest.fn().mockResolvedValue(task);

            await TaskController.findOne(req as Request, res as Response, next);

            expect(taskService.findOne).toHaveBeenCalledWith("1", "1");
            expect(res.json).toHaveBeenCalledWith(task);
        });

        it("should handle task not found", async () => {
            const taskService = TaskService.prototype;
            taskService.findOne = jest.fn().mockResolvedValue(null);

            await TaskController.findOne(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new TasksNotFoundError());
        });
    });

    describe("update", () => {
        it("should update a task successfully", async () => {
            const taskService = TaskService.prototype;
            taskService.update = jest.fn().mockResolvedValue(true);

            await TaskController.update(req as Request, res as Response, next);

            expect(taskService.update).toHaveBeenCalledWith("1", "1", { title: "Test Task" });
            expect(res.json).toHaveBeenCalledWith(true);
        });

        it("should handle task update failure", async () => {
            const taskService = TaskService.prototype;
            taskService.update = jest.fn().mockResolvedValue(false);

            await TaskController.update(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new TaskNotUpdatedError());
        });
    });

    describe("remove", () => {
        it("should delete a task successfully", async () => {
            const taskService = TaskService.prototype;
            taskService.remove = jest.fn().mockResolvedValue(true);

            await TaskController.remove(req as Request, res as Response, next);

            expect(taskService.remove).toHaveBeenCalledWith("1", "1");
            expect(res.json).toHaveBeenCalledWith(true);
        });

        it("should handle task deletion failure", async () => {
            const taskService = TaskService.prototype;
            taskService.remove = jest.fn().mockResolvedValue(false);

            await TaskController.remove(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new TaskNotDeletedError());
        });
    });
});