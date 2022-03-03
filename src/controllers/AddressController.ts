import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";

class AddressController {

    async create(request: Request, response: Response) {

        const addressService = new AddressService();
        const newAddress = await addressService.create(request.body);

        return response.status(201).json(newAddress);
    }

    async find(request: Request,response: Response) {

        const offset = Number(request.query.offset);
        const limit = Number(request.query.limit);

        const addressService = new AddressService();
        const addresses = await addressService.find(offset,limit);
        return response.status(200).json(addresses);
    }

    async findById(request: Request, response: Response) {

        const { id } = request.params;

        const addressService = new AddressService();
        const address = await addressService.findById(id);

        if (!address){
            return response.status(404).json({ message: "Endereço não encontrado." });
        }

        return response.status(200).json(address);
    }

    async update(request: Request, response: Response) {

        const { id } = request.params;
        const { publicPlace, number, district, city, cep, country} = request.body;
        const addressService = new AddressService();
        const address = await addressService.findById(id);

        if (!address){
            return response.status(404).json({ message: "Endereço não encontrado." });
        }

        await addressService.update(id,{
            publicPlace,
            number,
            district,
            city,
            cep,
            country
        });

        return response.status(200).json({ message: "Endereço atualizado com sucesso." });

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const addressService = new AddressService();
        const address = await addressService.findById(id);

        if (!address){
            return response.status(404).json({ message: "Endereço não encontrado." });
        }

        await addressService.delete(id);

        return response.status(200).json({ message: "Endereço removido com sucesso." });

    } 


}

export default new AddressController();