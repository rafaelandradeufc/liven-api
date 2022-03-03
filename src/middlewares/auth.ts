import { UserService } from "../services/UserSevice";
import * as jwt from 'jsonwebtoken';
import authConfig from "../config/authConfig";
import { NextFunction, Request, Response } from "express";

export default async (request: Request,response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
  
    if (!authHeader) {
      return response.status(401).json({ message: 'Token inexistente.' });
    }
  
    const [, token] = authHeader.split(' ');
  
    try {
      const decoded = <any>jwt.verify(token, authConfig.jwtSecret);
  
      const userId = decoded.id;
      const userService = new UserService();
      const userExists = await userService.findById(userId);

      if (!userExists) {
        return response.status(400).json({ message: 'Usuário não encontrado.' });
      }
  
      if (!userExists.isActive) {
        return response.status(400).json({ message: 'Usuário está desativado.' });
      }
  
      return next();
    } catch (err) {
      return response.status(401).json({ message: 'Token inválido.' });
    }
  };