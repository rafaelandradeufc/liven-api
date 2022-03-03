import { UserResquestTO } from "../interfaces/UserRequestTO";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { Address } from "../models/ Address";
import { User } from "../models/User";

export class UserService {

    async create(userRequest : UserResquestTO):Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const newUser = userRepository.create(userRequest);
        return userRepository.save(newUser);
    }

    async find(offset?:number,limit?:number):Promise<User[]> {
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.find({skip:offset, take:limit});
    }

    async findById(userId:string):Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.findOne(userId, { relations:["addresses"] });
    }

    async update(userId: string, userRequest: UserResquestTO) {
        const userRepository = getCustomRepository(UserRepository);
        userRepository.update(userId, userRequest);
    }

    async delete(userId:string) {
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.delete(userId);
    }

    async associateAddressWithUser(user: User, address: Address) {
        const userRepository = getCustomRepository(UserRepository);
        user.addresses.push(address);
        userRepository.save(user);

    }
    async findByUsername(username: string): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.findByUsername(username);
    }

}

