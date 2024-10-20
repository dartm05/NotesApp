import express from 'express';
import { TaskController } from '../controllers/task.controller';


const taskApp = express();

taskApp.get('/:userId/tasks', TaskController.findAll);
taskApp.get('/:userId/tasks/:id', TaskController.findOne);
taskApp.post('/:userId/tasks', TaskController.create);
taskApp.put('/:userId/tasks/:id', TaskController.update);


export default taskApp;