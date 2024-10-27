import { IUserUseCase } from "../../../src/domain/usecases/user/user.usecase";
import { IUser } from "../../../src/domain/models/user/user";
import { describe, it, beforeEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { UserController } from "../../../src/infrastructure/controllers/user.controller";

describe("UserController", () => {
  let mockUserService: jest.Mocked<IUserUseCase>;
  let next: jest.Mock;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockUserService = {
      create: jest.fn(),
      findUserByEmail: jest.fn(),
    };

    jest.mock("./user.service.mock");

    mockReq = getMockReq({
      body: { name: "John Doe", email: "john@gmail.com" },
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
      const mockUser = { email: "john@gmail.com", name: "John Doe" } as IUser;
      mockUserService.findUserByEmail.mockResolvedValueOnce(mockUser);

      await UserController.create(mockReq, mockRes, next);

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(mockReq.body);
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        email: "john@gmail.com",
      });
      expect(next).not.toHaveBeenCalled();
    });

    /*     it("should call next with UserNotCreatedError if user is not found after creation", async () => {
      // Arrange
      mockUserService.create.mockResolvedValueOnce();
      mockUserService.findUserByEmail.mockResolvedValueOnce(null); // Simulate user not created

      // Act
      await UserController.create(
        mockRequest as Request,
        mockResponse as Response,
        next
      );

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(next).toHaveBeenCalledWith(new UserNotCreatedError());
      expect(mockResponse.json).not.toHaveBeenCalled();
    }); */
  });

  /* describe('findOne', () => {
    it('should find a user and return user data', async () => {
      // Arrange
      mockRequest = { params: { email: 'test@example.com' } };
      mockUserService.findUserByEmail.mockResolvedValueOnce({ email: 'test@example.com' });

      // Act
      await UserController.findOne(mockRequest as Request, mockResponse as Response, next);

      // Assert
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockResponse.json).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next with UserNotFoundError if user is not found', async () => {
      // Arrange
      mockRequest = { params: { email: 'nonexistent@example.com' } };
      mockUserService.findUserByEmail.mockResolvedValueOnce(null); // Simulate user not found

      // Act
      await UserController.findOne(mockRequest as Request, mockResponse as Response, next);

      // Assert
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith('nonexistent@example.com');
      expect(next).toHaveBeenCalledWith(new UserNotFoundError());
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  }); */
});
