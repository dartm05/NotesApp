import express from 'express';
import { UserController } from '../controllers/user.controller';

const userApp = express();

userApp.post('/users', UserController.create);
userApp.get('/users/:email', UserController.findOne);

export default userApp;