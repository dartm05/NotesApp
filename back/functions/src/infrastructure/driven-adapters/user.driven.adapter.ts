import { db } from "../../index";
import { IUserUseCase } from "../../domain/usecases/user/user.usecase";
import { IUser } from "../../domain/models/user/user";

export class UserDrivenAdapter implements IUserUseCase {
  async create(user: IUser): Promise<void> {
    await db.collection("users").add(user);
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    const user = await db.collection("users").where("email", "==", email).get();
    if (user.empty) {
      return undefined;
    }
    return { ...user.docs[0].data(), id: user.docs[0].id } as IUser;
  }
}
