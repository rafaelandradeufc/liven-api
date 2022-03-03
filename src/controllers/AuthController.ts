import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import authConfig from "../config/authConfig";
import { UserService } from "../services/UserSevice";

class AuthController {

    async login(request: Request, response: Response){

        const { username, password } = request.body;

        const userService = new UserService();
        const user = await userService.findByUsername(username);

        if (!user){
            return response.status(404).json({ message: "Username não encontrado." });
        }

        if (!user.isActive) {
            return response.status(400).json({ message: 'Usuário está desativado.' });
          }

        if (!(user.compareHash(password))) {
         return response.status(401).json({ message: 'Senha incorreta.' });
        }

        const { id, firstName, lastName } = user;

        return response.json({
            user: { firstName, lastName },
            token: jwt.sign({ id }, authConfig.jwtSecret, {
              expiresIn: authConfig.expireIn,
            }),
          });

    }

}
export default new AuthController();