import { UserNotFoundError } from "../../../src/domain/errors/user-not-found.error";
import { UserNotCreatedError } from "../../../src/domain/errors/user-not-created.error";
import {
  UserController,
  serviceInjection,
} from "../../../src/infrastructure/controllers/user.controller";
import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { IUser } from "../../../src/domain/models/user/user";

jest.mock("../../../src/infrastructure/controllers/user.controller", () => {
  const actualModule = jest.requireActual("../../../src/infrastructure/controllers/user.controller");

  return actualModule && typeof actualModule === 'object' 
    ? { ...actualModule, serviceInjection: jest.fn() }
    : { serviceInjection: jest.fn() };
});

const mockUser: IUser = { email: "john@gmail.com", name: "John Doe", id: " 1" };

const mockUserService = {
  create: jest.fn() as jest.MockedFunction<(user: IUser) => Promise<void>>,
  findUserByEmail: jest.fn() as jest.MockedFunction<
    (email: string) => Promise<IUser | null>
  >,
};

(serviceInjection as jest.Mock).mockReturnValue(mockUserService);

describe("UserController", () => {
  let mockReq;
  let mockRes;
  let next: jest.Mock;

  beforeEach(() => {
    mockReq = getMockReq({
      body: { name: "John Doe", email: "john@gmail.com" },
      params: { email: "john@gmail.com" },
    });

    mockRes = getMockRes({
      json: jest.fn() as any,
      status: jest.fn().mockReturnThis(),
    });

    next = jest.fn();
  });

  describe("create", () => {
    it("should create a user and return user data", async () => {
 
      mockUserService.create.mockResolvedValueOnce(undefined);
      mockUserService.findUserByEmail.mockResolvedValueOnce(mockUser);

      await UserController.create(mockReq, mockRes, next);

      expect(mockUserService.create).toHaveBeenCalledWith(mockReq.body);
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with UserNotCreatedError if user creation fails", async () => {
      mockUserService.create.mockResolvedValueOnce(undefined);
      mockUserService.findUserByEmail.mockResolvedValueOnce(undefined);

      await UserController.create(mockReq, mockRes, next);

      expect(mockUserService.create).toHaveBeenCalledWith(mockReq.body);
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(next).toHaveBeenCalledWith(new UserNotCreatedError());
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should retrieve an existing user and return user data", async () => {
      mockUserService.findUserByEmail.mockResolvedValueOnce(mockUser);

      await UserController.findOne(mockReq, mockRes, next);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with UserNotFoundError if user does not exist", async () => {
      mockUserService.findUserByEmail.mockResolvedValueOnce(null);

      await UserController.findOne(mockReq, mockRes, next);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(next).toHaveBeenCalledWith(new UserNotFoundError());
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });
});
