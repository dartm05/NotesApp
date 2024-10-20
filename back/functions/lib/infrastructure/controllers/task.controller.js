"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../../application/services/task.service");
const task_driven_adapter_1 = require("../driven-adapters/task.driven.adapter");
class TaskController {
    static async create({ params: { userId }, body }, res) {
        const taskService = serviceInjection();
        const success = await taskService.create(userId, body);
        res.json(success);
    }
    static async findAll({ params: { userId } }, res) {
        const taskService = serviceInjection();
        const tasks = await taskService.findAll(userId);
        res.json(tasks);
    }
    static async findOne({ params: { userId, id } }, res) {
        const taskService = serviceInjection();
        const task = await taskService.findOne(userId, id);
        res.json(task);
    }
    static async update({ params: { userId, id }, body }, res) {
        const taskService = serviceInjection();
        const success = await taskService.update(userId, id, body);
        res.json(success);
    }
    static async remove({ params: { userId, id } }, res) {
        const taskService = serviceInjection();
        const success = await taskService.remove(userId, id);
        res.json(success);
    }
}
exports.TaskController = TaskController;
function serviceInjection() {
    const taskDrivenAdapter = new task_driven_adapter_1.TaskDrivenAdapter();
    const taskService = new task_service_1.TaskService(taskDrivenAdapter);
    return taskService;
}
//# sourceMappingURL=task.controller.js.map