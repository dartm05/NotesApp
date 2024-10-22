import { IUser } from "../../models/user/user";

export interface IUserUseCase {
    create(user: IUser): Promise<void>;
    findUserByEmail(email: string): Promise<IUser | undefined>;
}