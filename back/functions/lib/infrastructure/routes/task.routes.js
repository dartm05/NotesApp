"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const taskApp = (0, express_1.default)();
taskApp.get('/:userId/tasks', task_controller_1.TaskController.findAll);
taskApp.get('/:userId/tasks/:id', task_controller_1.TaskController.findOne);
taskApp.post('/:userId/tasks', task_controller_1.TaskController.create);
taskApp.put('/:userId/tasks/:id', task_controller_1.TaskController.update);
exports.default = taskApp;
//# sourceMappingURL=task.routes.js.map