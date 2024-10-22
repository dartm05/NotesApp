import { IUserUseCase } from "../../domain/usecases/user/user.usecase";
import { IUser } from "../../domain/models/user/user";

export class UserService implements IUserUseCase {
     constructor(private userDrivenAdapter: IUserUseCase) {}

     create(user: IUser): Promise<void> {
        return this.userDrivenAdapter.create(user);
     }
     findUserByEmail(email: string): Promise<IUser | undefined> {
        return this.userDrivenAdapter.findUserByEmail(email);
     }
}