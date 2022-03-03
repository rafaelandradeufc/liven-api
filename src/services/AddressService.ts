import { getCustomRepository } from "typeorm";
import { AddressRequestTO } from "../interfaces/AddressRequestTO";
import { Address } from "../models/ Address";
import { AddressRepository } from "../repositories/AddressRepository";


export class AddressService {

async create(addressRequest : AddressRequestTO):Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);
    const newAddress = addressRepository.create(addressRequest);
    return addressRepository.save(newAddress);
}

async find(offset?:number,limit?:number):Promise<Address[]> {
    const addressRepository = getCustomRepository(AddressRepository);
    return addressRepository.find({skip:offset, take:limit});
}

async findById(newAddressId:string):Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);
    return addressRepository.findOne(newAddressId);
}

async update(newAddressId: string, addressRequest: AddressRequestTO) {
    const addressRepository = getCustomRepository(AddressRepository);
    addressRepository.update(newAddressId, addressRequest);
}

async delete(newAddressId:string) {
    const addressRepository = getCustomRepository(AddressRepository);
    return addressRepository.delete(newAddressId);
}


}

