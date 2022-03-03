
import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import { UserService } from "../services/UserSevice";

class UserController {

    async create(request: Request, response: Response) {

        const userService = new UserService();
        const newUser = await userService.create(request.body);

        return response.status(201).json(newUser);
    }

    async find(request: Request,response: Response) {

        const offset = Number(request.query.offset);
        const limit = Number(request.query.limit);

        const userService = new UserService();
        const users = await userService.find(offset,limit);
        return response.status(200).json(users);
    }

    async findById(request: Request, response: Response) {

        const { id } = request.params;

        const userService = new UserService();
        const user = await userService.findById(id);

        if (!user){
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        return response.status(200).json(user);
    }

    async update(request: Request, response: Response) {

        const { id } = request.params;
        const {firstName, lastName, dateOfBirth, cpf, email, phone, username, password} = request.body;
        const userService = new UserService();
        const user = await userService.findById(id);

        if (!user){
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        await userService.update(id,{ 
            firstName,
            lastName,
            dateOfBirth,
            cpf,
            email,
            phone,
            username,
            password
        });

        return response.status(200).json({ message: "Usuário atualizado com sucesso." });

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const userService = new UserService();
        const user = await userService.findById(id);

        if (!user){
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        await userService.delete(id);

        return response.status(200).json({ message: "Usuário removido com sucesso." });

    }

    async associateAddressWithUser(request: Request, response: Response){

        const { userId, addressId } = request.params;

        const userService = new UserService();
        const user = await userService.findById(userId);

        const addressService = new AddressService();
        const address = await addressService.findById(addressId);


        if (!user){
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        if (!address){
            return response.status(404).json({ message: "Endereço não encontrado." });
        }

        await userService.associateAddressWithUser(user, address);

        return response.status(200).json({ message: "Endereço vinculado ao Usuário com sucesso." });

    }

}

export default new UserController();