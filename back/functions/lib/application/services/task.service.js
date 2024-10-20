"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    constructor(taskDrivenAdapter) {
        this.taskDrivenAdapter = taskDrivenAdapter;
    }
    create(userId, task) {
        return this.taskDrivenAdapter.create(userId, task);
    }
    findAll(userId) {
        return this.taskDrivenAdapter.findAll(userId);
    }
    findOne(userId, id) {
        return this.taskDrivenAdapter.findOne(userId, id);
    }
    update(userId, id, task) {
        return this.taskDrivenAdapter.update(userId, id, task);
    }
    remove(userId, id) {
        return this.taskDrivenAdapter.remove(userId, id);
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map