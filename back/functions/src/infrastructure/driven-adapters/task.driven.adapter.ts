import { ITaskUseCase } from "../../domain/usecases/task/task.usecase";
import { ITask } from "../../domain/models/task/task";
import { db } from "../../index";

export class TaskDrivenAdapter implements ITaskUseCase {
  async create(userId: string, task: ITask): Promise<void> {
    await db.collection("users").doc(userId).collection("tasks").add(task);
  }

  async findAll(userId: string): Promise<ITask[]> {
    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .get();
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as ITask;
    });
  }

  async findOne(userId: string, id: string): Promise<ITask | undefined> {
    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(id)
      .get();
    return { ...querySnapshot.data(), id } as ITask;
  }

  async update(userId: string, id: string, task: ITask): Promise<void> {
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(id)
      .update({ ...task });
  }

  async remove(userId: string, id: string): Promise<void> {
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(id)
      .delete();
  }

  async removeAll(userId: string): Promise<void> {
    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .get();
    querySnapshot.docs.forEach((doc) => doc.ref.delete());
  }
}
