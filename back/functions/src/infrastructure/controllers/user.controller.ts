import { Request, Response } from "express";
import { UserService } from "../../application/services/user.service";
import { IUserUseCase } from "../../domain/usecases/user/user.usecase";
import { UserDrivenAdapter } from "../driven-adapters/user.driven.adapter";
export class UserController {
  static async create({ body }: Request, res: Response): Promise<void> {
    const userService = serviceInjection();
    const success = await userService.create(body);
    res.json(success);
  }

  static async findOne(
    { params: { email } }: Request,
    res: Response
  ): Promise<void> {
    const userService = serviceInjection();
    const user = await userService.findUserByEmail(email);
    res.json(user);
  }
}
function serviceInjection(): IUserUseCase {
  const userDrivenAdapter = new UserDrivenAdapter();
  const userService = new UserService(userDrivenAdapter);
  return userService;
}
