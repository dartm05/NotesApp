import { IUserUseCase } from "../../../src/domain/usecases/user/user.usecase";
import { IUser } from "../../../src/domain/models/user/user";

import { describe, it, beforeEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";

describe("UserUseCase", () => {
  let userUseCase: IUserUseCase;
  let mockUser: IUser;

  beforeEach(() => {
    mockUser = {
      id: "1",
      name: "Juan Torres",
      email: "juan.torres@example.com",
    };

    userUseCase = {
      create: jest.fn<(user: IUser) => Promise<IUser>>(),
      findUserByEmail: jest.fn<(email: string) => Promise<IUser>>(),
    };
  });

  it("should create a user", async () => {
    const result = await userUseCase.create(mockUser);
    expect(result).toEqual(mockUser);
    expect(userUseCase.create).toHaveBeenCalledWith(mockUser);
  });

  it("should find a user by email", async () => {
    const result = await userUseCase.findUserByEmail(mockUser.email);
    expect(result).toEqual(mockUser);
    expect(userUseCase.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
  });

  it("should return undefined if user is not found by email", async () => {
    (userUseCase.findUserByEmail as jest.Mock).mockReturnValueOnce(undefined);
    const result = await userUseCase.findUserByEmail("nonexistent@example.com");
    expect(result).toBeUndefined();
    expect(userUseCase.findUserByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com"
    );
  });
});
