import { Request, Response } from "express";
import { UserController } from "../../../src/infrastructure/controllers/user.controller";
import { UserService } from "../../../src/application/services/user.service";
import { UserNotFoundError } from "../../../src/domain/errors/user-not-found.error";
import { UserNotCreatedError } from "../../../src/domain/errors/user-not-created.error";

import { describe, it, beforeEach, expect, jest } from "@jest/globals";


jest.mock("../../../src/application/services/user.service");

describe("UserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn() as unknown as Response["json"],
      status: jest.fn() as unknown as Response["status"],
      send: jest.fn() as unknown as Response["send"],
    };
    res = {
      json: jest.fn() as unknown as Response["json"],
    };
    next = jest.fn();
  });

  describe("create", () => {
    it("should create a user and return it", async () => {
      req.body = { email: "test@example.com" };
      const mockUser = { email: "test@example.com" };
      (UserService.prototype.create as jest.Mock).mockReturnValueOnce(
        undefined
      );
      (UserService.prototype.findUserByEmail as jest.Mock).mockReturnValueOnce(
        mockUser
      );

      await UserController.create(req as Request, res as Response, next);

      expect(UserService.prototype.create).toHaveBeenCalledWith(req.body);
      expect(UserService.prototype.findUserByEmail).toHaveBeenCalledWith(
        req.body.email
      );
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should call next with UserNotCreatedError if user is not created", async () => {
      req.body = { email: "test@example.com" };
      (UserService.prototype.create as jest.Mock).mockReturnValueOnce(
        undefined
      );
      (UserService.prototype.findUserByEmail as jest.Mock).mockReturnValueOnce(
        null
      );

      await UserController.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new UserNotCreatedError());
    });
  });

  describe("findOne", () => {
    it("should return a user if found", async () => {
      req.params = { email: "test@example.com" };
      const mockUser = { email: "test@example.com" };
      (UserService.prototype.findUserByEmail as jest.Mock).mockReturnValueOnce(
        mockUser
      );

      await UserController.findOne(req as Request, res as Response, next);

      expect(UserService.prototype.findUserByEmail).toHaveBeenCalledWith(
        req.params.email
      );
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should call next with UserNotFoundError if user is not found", async () => {
      req.params = { email: "test@example.com" };
      (UserService.prototype.findUserByEmail as jest.Mock).mockReturnValueOnce(
        null
      );

      await UserController.findOne(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(new UserNotFoundError());
    });
  });
});
